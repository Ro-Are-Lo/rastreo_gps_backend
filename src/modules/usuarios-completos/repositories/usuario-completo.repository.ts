// src/modules/usuarios-completos/repositories/usuario-completo.repository.ts - VERSIÓN COMPLETA
import { prisma } from '../../../config/prisma';
import { UsuarioCompleto } from '../interfaces/usuario-completo.interface';

export class UsuarioCompletoRepository {
    

async crear(data: any): Promise<UsuarioCompleto> {
  return await prisma.$transaction(async (tx) => {
    // 1. Crear Persona (solo campos básicos)
    const persona = await tx.persona.create({
      data: {
        nombre: data.nombre,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        genero: data.genero,
        foto_url: data.foto_url,
        activo: true,
        eliminado: false
      }
    });

    // 2. Crear Usuario
    const usuario = await tx.usuario.create({
      data: {
        id_persona: persona.id,
        username: data.username,
        password_hash: data.password_hash,
        activo: true,
        eliminado: false
      }
    });

    // 3. Guardar CONTACTOS (email, teléfono)
    const contactos = [];
    const contactosParaCrear = [
      { tipo: 'EMAIL', valor: data.email },
      { tipo: 'TELEFONO', valor: data.telefono },
      // Agregar nacionalidad si viene
      ...(data.nacionalidad ? [{ tipo: 'NACIONALIDAD', valor: data.nacionalidad }] : [])
    ];

    for (const contactoData of contactosParaCrear) {
      if (contactoData.valor) {
        const contacto = await tx.contacto.create({
          data: {
            id_persona: persona.id,
            tipo: contactoData.tipo,
            valor: contactoData.valor,
            activo: true,
            eliminado: false
          }
        });
        contactos.push(contacto);
      }
    }

    // 4. Guardar DOCUMENTOS (cédula, licencia)
    const documentos = [];
    const documentosParaCrear = [
      { tipo: 'CEDULA', nro: data.cedula_identidad },
      { tipo: 'LICENCIA', nro: data.licencia_numero }
    ];

    for (const docData of documentosParaCrear) {
      if (docData.nro) {
        const documento = await tx.documento.create({
          data: {
            id_persona: persona.id,
            tipo_documento: docData.tipo,
            nro_documento: docData.nro,
            activo: true,
            eliminado: false
          }
        });
        documentos.push(documento);
      }
    }

    // 5. Asignar Roles
    const rolesAsignados = [];
    for (const rolNombre of data.roles || ['CONDUCTOR']) {
      let rol = await tx.rol.findFirst({
        where: { nombre: rolNombre }
      });

      if (!rol) {
        rol = await tx.rol.create({
          data: {
            nombre: rolNombre,
            activo: true,
            eliminado: false
          }
        });
      }

      await tx.usuarioRol.create({
        data: {
          id_usuario: usuario.id,
          id_rol: rol.id
        }
      });

      rolesAsignados.push(rol);
    }

    return {
      id: usuario.id,
      persona: {
        ...persona,
        apellido_paterno: persona.apellido_paterno ?? undefined,
        apellido_materno: persona.apellido_materno ?? undefined,
        genero: persona.genero ?? undefined,
        foto_url: persona.foto_url ?? undefined
      },
      usuario: {
        ...usuario,
        fecha_modificacion: usuario.fecha_modificacion ?? undefined
      },
      documentos,
      contactos,
      roles: rolesAsignados
    };
  });
}


    

            // En usuario-completo.repository.ts
async obtenerPorId(id: number): Promise<UsuarioCompleto | null> {
  const usuario = await prisma.usuario.findUnique({
    where: { id },
    include: {
      persona: true,
      roles: {
        include: {
          rol: true
        }
      }
    }
  });

  if (!usuario) return null;

  // Obtener todos los documentos
  const documentos = await prisma.documento.findMany({
    where: { id_persona: usuario.id_persona, activo: true, eliminado: false }
  });

  // Obtener todos los contactos
  const contactos = await prisma.contacto.findMany({
    where: { id_persona: usuario.id_persona, activo: true, eliminado: false }
  });

  // Estructurar respuesta con datos organizados
  const email = contactos.find(c => c.tipo === 'EMAIL')?.valor;
  const telefono = contactos.find(c => c.tipo === 'TELEFONO')?.valor;
  const nacionalidad = contactos.find(c => c.tipo === 'NACIONALIDAD')?.valor;
  
  const cedula = documentos.find(d => d.tipo_documento === 'CEDULA')?.nro_documento;
  const licencia = documentos.find(d => d.tipo_documento === 'LICENCIA')?.nro_documento;

  return {
    id: usuario.id,
    persona: {
      ...usuario.persona,
      apellido_paterno: usuario.persona.apellido_paterno ?? undefined,
      apellido_materno: usuario.persona.apellido_materno ?? undefined,
      genero: usuario.persona.genero ?? undefined,
      foto_url: usuario.persona.foto_url ?? undefined
    },
    usuario: {
      ...usuario,
      fecha_modificacion: usuario.fecha_modificacion ?? undefined
    },
    documentos,
    contactos,
    // Datos extraídos para fácil acceso
    datosExtras: {
      email,
      telefono,
      nacionalidad,
      cedula_identidad: cedula,
      licencia_numero: licencia
    },
    roles: usuario.roles.map(ur => ur.rol)
  };
}

    async listar(filtros: any) {
    console.log('📋 [Repository.listar] Filtros recibidos:', filtros);
    
    // Parsear valores
    const { 
      search = '', 
      rol = '', 
      activo = 'true', 
      page = '1', 
      limit = '50' 
    } = filtros;
    
    const pageNum = parseInt(page.toString());
    const limitNum = parseInt(limit.toString());
    const skip = (pageNum - 1) * limitNum;
    const isActive = activo === 'true' || activo === true;

    console.log(`🔍 [Repository] Parámetros: page=${pageNum}, limit=${limitNum}, activo=${isActive}`);

    // Construir where
    const where: any = {
      activo: isActive,
      eliminado: false
    };

    // Búsqueda
    if (search && search.trim() !== '') {
      console.log(`🔍 [Repository] Aplicando búsqueda: "${search}"`);
      
      where.OR = [
        {
          username: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          persona: {
            OR: [
              {
                nombre: {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              {
                apellido_paterno: {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              {
                apellido_materno: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            ]
          }
        }
      ];
    }

    // Filtrar por rol
    if (rol && rol.trim() !== '') {
      console.log(`🔍 [Repository] Filtrando por rol: "${rol}"`);
      where.roles = {
        some: {
          rol: {
            nombre: rol
          }
        }
      };
    }

    console.log('🎯 [Repository] Where clause:', JSON.stringify(where, null, 2));

    try {
      // Query principal
      const usuarios = await prisma.usuario.findMany({
        where,
        include: {
          persona: {
            include: {
              contactos: {
                where: { activo: true, eliminado: false }
              },
              documentos: {
                where: { activo: true, eliminado: false }
              }
            }
          },
          roles: {
            include: {
              rol: true
            }
          }
        },
        skip,
        take: limitNum,
        orderBy: { fecha_creacion: 'desc' }
      });

      const total = await prisma.usuario.count({ where });

      console.log(`📊 [Repository] Encontrados ${usuarios.length} usuarios de ${total} totales`);

      // Transformación
      const data = usuarios.map(usuario => {
        const email = usuario.persona?.contactos?.find((c: any) => c.tipo === 'EMAIL')?.valor || '';
        const telefono = usuario.persona?.contactos?.find((c: any) => c.tipo === 'TELEFONO')?.valor || '';
        const cedula = usuario.persona?.documentos?.find((d: any) => d.tipo_documento === 'CEDULA')?.nro_documento || '';
        
        return {
          id: usuario.id,
          username: usuario.username,
          nombre: usuario.persona?.nombre || '',
          apellido_paterno: usuario.persona?.apellido_paterno || '',
          apellido_materno: usuario.persona?.apellido_materno || '',
          genero: usuario.persona?.genero || '',
          foto_url: usuario.persona?.foto_url || null,
          roles: usuario.roles.map((ur: any) => ur.rol.nombre),
          email,
          telefono,
          cedula_identidad: cedula,
          persona: usuario.persona ? {
            id: usuario.persona.id,
            nombre: usuario.persona.nombre,
            apellido_paterno: usuario.persona.apellido_paterno,
            apellido_materno: usuario.persona.apellido_materno,
            genero: usuario.persona.genero,
            foto_url: usuario.persona.foto_url
          } : null,
          activo: usuario.activo,
          eliminado: usuario.eliminado
        };
      });

      console.log(`✅ [Repository] Datos transformados: ${data.length} items`);
      
      if (data.length > 0) {
        console.log('👤 Primer usuario:', {
          id: data[0].id,
          username: data[0].username,
          nombre: data[0].nombre,
          roles: data[0].roles
        });
      }

      return {
        success: true,
        data,
        meta: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum)
        }
      };
      
    } catch (error: any) { // 🔥 ERROR TIPADO
      console.error('🔥 [Repository] Error en findMany:', error);
      console.error('🔥 [Repository] Error details:', {
        message: error.message,
        code: error.code,
        meta: error.meta
      });
      throw error;
    }
  }





  async actualizar(id: number, data: any): Promise<UsuarioCompleto> {
    await prisma.$transaction(async (tx) => {
      const usuario = await tx.usuario.findUnique({
        where: { id },
        include: { persona: true }
      });

      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Actualizar Persona
      await tx.persona.update({
        where: { id: usuario.id_persona },
        data: {
          nombre: data.nombre || usuario.persona.nombre,
          apellido_paterno: data.apellido_paterno || usuario.persona.apellido_paterno,
          apellido_materno: data.apellido_materno !== undefined ? data.apellido_materno : usuario.persona.apellido_materno,
          genero: data.genero !== undefined ? data.genero : usuario.persona.genero,
          foto_url: data.foto_url !== undefined ? data.foto_url : usuario.persona.foto_url,
          fecha_modificacion: new Date()
        }
      });

      // Actualizar Usuario
      const updateDataUsuario: any = {
        username: data.username || usuario.username,
        fecha_modificacion: new Date(),
        ...(data.activo !== undefined && { activo: data.activo })
      };

      if (data.password_hash) {
        updateDataUsuario.password_hash = data.password_hash;
      }

      await tx.usuario.update({
        where: { id },
        data: updateDataUsuario
      });

      // Actualizar Documentos
      if (data.cedula_identidad) {
        await this.actualizarDocumento(tx, usuario.id_persona, 'CEDULA', data.cedula_identidad);
      }

      if (data.licencia_numero) {
        await this.actualizarDocumento(tx, usuario.id_persona, 'LICENCIA', data.licencia_numero);
      }

      // Actualizar Contactos
      if (data.email) {
        await this.actualizarContacto(tx, usuario.id_persona, 'EMAIL', data.email);
      }

      if (data.telefono) {
        await this.actualizarContacto(tx, usuario.id_persona, 'TELEFONO', data.telefono);
      }
    });

    // Obtener datos actualizados
    const usuarioActualizado = await this.obtenerPorId(id);
    if (!usuarioActualizado) {
      throw new Error('Error al obtener usuario actualizado');
    }
    
    return usuarioActualizado;
  }

  private async actualizarDocumento(tx: any, idPersona: number, tipo: string, valor: string) {
    const existe = await tx.documento.findFirst({
      where: { id_persona: idPersona, tipo_documento: tipo }
    });

    if (existe) {
      await tx.documento.update({
        where: { id: existe.id },
        data: { nro_documento: valor, fecha_modificacion: new Date() }
      });
    } else {
      await tx.documento.create({
        data: {
          id_persona: idPersona,
          tipo_documento: tipo,
          nro_documento: valor,
          activo: true,
          eliminado: false
        }
      });
    }
  }

  private async actualizarContacto(tx: any, idPersona: number, tipo: string, valor: string) {
    const existe = await tx.contacto.findFirst({
      where: { id_persona: idPersona, tipo }
    });

    if (existe) {
      await tx.contacto.update({
        where: { id: existe.id },
        data: { valor, fecha_modificacion: new Date() }
      });
    } else {
      await tx.contacto.create({
        data: {
          id_persona: idPersona,
          tipo,
          valor,
          activo: true,
          eliminado: false
        }
      });
    }
  }

  async eliminarLogicamente(id: number): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const usuario = await tx.usuario.findUnique({
        where: { id },
        include: { persona: true }
      });

      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      await tx.usuario.update({
        where: { id },
        data: {
          activo: false,
          eliminado: true,
          fecha_modificacion: new Date()
        }
      });

      await tx.persona.update({
        where: { id: usuario.id_persona },
        data: {
          activo: false,
          eliminado: true,
          fecha_modificacion: new Date()
        }
      });

      await tx.documento.updateMany({
        where: { id_persona: usuario.id_persona },
        data: {
          activo: false,
          eliminado: true,
          fecha_modificacion: new Date()
        }
      });

      await tx.contacto.updateMany({
        where: { id_persona: usuario.id_persona },
        data: {
          activo: false,
          eliminado: true,
          fecha_modificacion: new Date()
        }
      });
    });
  }

  async reactivar(id: number): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const usuario = await tx.usuario.findUnique({
        where: { id },
        include: { persona: true }
      });

      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      await tx.usuario.update({
        where: { id },
        data: {
          activo: true,
          eliminado: false,
          fecha_modificacion: new Date()
        }
      });

      await tx.persona.update({
        where: { id: usuario.id_persona },
        data: {
          activo: true,
          eliminado: false,
          fecha_modificacion: new Date()
        }
      });
    });
  }
}