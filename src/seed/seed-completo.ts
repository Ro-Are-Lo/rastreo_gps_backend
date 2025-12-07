// src/seed/seed-final-completo.ts
import axios from 'axios';
import { crearAdmin } from './crearAdmin';

const API_BASE_URL = 'http://localhost:3000/api';

class FinalSeedService {
  private adminToken = '';

  async waitForServer(): Promise<boolean> {
    console.log('⏳ Verificando servidor...');
    
    try {
      await axios.get('http://localhost:3000', { timeout: 3000 });
      console.log('✅ Servidor disponible');
      return true;
    } catch (error) {
      console.log('❌ Servidor no disponible');
      console.log('💡 Ejecuta en otra terminal: npm run dev');
      return false;
    }
  }

  async login(): Promise<boolean> {
    try {
      console.log('🔑 Login con admin...');
      
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          username: 'admin',
          password: 'admin123'
        },
        { timeout: 5000 }
      );
      
      if (response.data.success && response.data.token) {
        this.adminToken = response.data.token;
        console.log('✅ Login exitoso');
        return true;
      }
      return false;
    } catch (error: any) {
      console.log('❌ Error en login:', error.message);
      return false;
    }
  }

  async crearUsuario(usuarioData: any, index: number) {
    try {
      console.log(`📝 [${index}] Creando: ${usuarioData.username}...`);
      
      const response = await axios.post(
        `${API_BASE_URL}/usuarios-completos`,
        usuarioData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.adminToken}`
          },
          timeout: 5000
        }
      );
      
      return {
        success: true,
        id: response.data.data?.usuario?.id,
        username: usuarioData.username,
        nombre: `${usuarioData.nombre} ${usuarioData.apellido_paterno}`,
        rol: usuarioData.roles[0]
      };
    } catch (error: any) {
      return {
        success: false,
        username: usuarioData.username,
        error: error.response?.data?.message || error.message
      };
    }
  }

  async run() {
    console.log('🎮 SEED FINAL COMPLETO - USUARIOS DE PRUEBA');
    console.log('============================================\n');
    
    // 1. Verificar servidor
    if (!(await this.waitForServer())) return;
    
    // 2. Crear admin si no existe
    console.log('\n👑 Verificando admin principal...');
    await crearAdmin();
    
    // 3. Login
    if (!(await this.login())) {
      console.log('\n⚠️  No se pudo autenticar. Verifica:');
      console.log('   1. Que el servidor esté corriendo');
      console.log('   2. Que el endpoint /api/auth/login funcione');
      return;
    }
    
    // 4. Datos completos de prueba para frontend
    const usuariosDePrueba = [
      // ADMINISTRADORES
      {
        nombre: 'Carlos',
        apellido_paterno: 'Administrador',
        username: 'carlos.admin',
        password: 'Admin123!',
        roles: ['ADMIN'],
        descripcion: 'Admin secundario'
      },
      
      // CONDUCTORES
      {
        nombre: 'Juan',
        apellido_paterno: 'Pérez',
        username: 'juan.conductor',
        password: 'Conductor123!',
        roles: ['CONDUCTOR'],
        descripcion: 'Conductor principal'
      },
      {
        nombre: 'María',
        apellido_paterno: 'Gómez',
        username: 'maria.conductora',
        password: 'Conductora123!',
        roles: ['CONDUCTOR'],
        descripcion: 'Conductora femenina'
      },
      {
        nombre: 'Pedro',
        apellido_paterno: 'Rodríguez',
        username: 'pedro.conductor',
        password: 'Conductor123!',
        roles: ['CONDUCTOR'],
        descripcion: 'Conductor adicional'
      },
      
      // SUPERVISORES
      {
        nombre: 'Roberto',
        apellido_paterno: 'Supervisor',
        username: 'roberto.supervisor',
        password: 'Supervisor123!',
        roles: ['SUPERVISOR'],
        descripcion: 'Supervisor principal'
      },
      {
        nombre: 'Laura',
        apellido_paterno: 'Control',
        username: 'laura.supervisora',
        password: 'Supervisora123!',
        roles: ['SUPERVISOR'],
        descripcion: 'Supervisora femenina'
      },
      
      // USUARIOS MÍNIMOS (para pruebas de validación)
      {
        nombre: 'Minimal',
        apellido_paterno: 'User',
        username: 'minimal.user',
        password: 'Password123!',
        roles: ['CONDUCTOR'],
        descripcion: 'Usuario con datos mínimos'
      },
      {
        nombre: 'Test',
        apellido_paterno: 'Validation',
        username: 'test.validation',
        password: 'Test123!',
        roles: ['CONDUCTOR'],
        descripcion: 'Para pruebas de validación'
      }
    ];
    
    // 5. Crear usuarios
    console.log('\n👥 Creando usuarios de prueba...\n');
    
    const resultados = [];
    for (let i = 0; i < usuariosDePrueba.length; i++) {
      const usuario = usuariosDePrueba[i];
      const resultado = await this.crearUsuario(usuario, i + 1);
      resultados.push(resultado);
      
      // Pequeña pausa para no saturar
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // 6. Mostrar resultados detallados
    console.log('\n📊 RESULTADOS DETALLADOS:');
    console.log('========================\n');
    
    let exitosos = 0;
    const usuariosPorRol: any = {};
    
    resultados.forEach((result, index) => {
      const usuario = usuariosDePrueba[index];
      const icon = result.success ? '✅' : '❌';
      const estado = result.success ? 'CREADO' : 'FALLÓ';
      
      console.log(`${icon} [${index + 1}] ${estado}: ${usuario.descripcion}`);
      console.log(`   👤 ${usuario.nombre} ${usuario.apellido_paterno}`);
      console.log(`   👤 Usuario: ${usuario.username}`);
      console.log(`   🔑 Password: ${usuario.password}`);
      console.log(`   🎭 Rol: ${usuario.roles[0]}`);
      
      if (result.success) {
        console.log(`   🆔 ID: ${result.id}`);
        exitosos++;
        
        // Agrupar por rol para el resumen
        const rol = usuario.roles[0];
        if (!usuariosPorRol[rol]) usuariosPorRol[rol] = [];
        usuariosPorRol[rol].push(usuario.username);
      } else {
        console.log(`   ❌ Error: ${result.error}`);
      }
      console.log('');
    });
    
    // 7. Resumen por roles
    console.log('📈 RESUMEN POR ROL:');
    console.log('===================\n');
    
    Object.keys(usuariosPorRol).forEach(rol => {
      console.log(`🎭 ${rol.toUpperCase()}: ${usuariosPorRol[rol].length} usuarios`);
      usuariosPorRol[rol].forEach((username: string) => {
        console.log(`   👤 ${username}`);
      });
      console.log('');
    });
    
    // 8. Estadísticas finales
    console.log('📊 ESTADÍSTICAS FINALES:');
    console.log('========================\n');
    console.log(`🎯 TOTAL: ${resultados.length} usuarios procesados`);
    console.log(`✅ EXITOSOS: ${exitosos}`);
    console.log(`❌ FALLIDOS: ${resultados.length - exitosos}`);
    console.log(`📈 TASA DE ÉXITO: ${Math.round((exitosos / resultados.length) * 100)}%`);
    
    // 9. Credenciales organizadas
    console.log('\n🔐 CREDENCIALES ORGANIZADAS PARA FRONTEND:');
    console.log('=========================================\n');
    
    console.log('👑 ADMINISTRADORES:');
    console.log('-------------------');
    resultados.forEach((result, index) => {
      const usuario = usuariosDePrueba[index];
      if (usuario.roles[0] === 'ADMIN') {
        console.log(`👤 ${usuario.nombre} ${usuario.apellido_paterno}`);
        console.log(`   Usuario: ${usuario.username}`);
        console.log(`   Password: ${usuario.password}`);
        console.log(`   Descripción: ${usuario.descripcion}`);
        console.log('');
      }
    });
    
    console.log('👥 CONDUCTORES:');
    console.log('---------------');
    resultados.forEach((result, index) => {
      const usuario = usuariosDePrueba[index];
      if (usuario.roles[0] === 'CONDUCTOR') {
        console.log(`👤 ${usuario.nombre} ${usuario.apellido_paterno}`);
        console.log(`   Usuario: ${usuario.username}`);
        console.log(`   Password: ${usuario.password}`);
        if (usuario.descripcion) console.log(`   Descripción: ${usuario.descripcion}`);
        console.log('');
      }
    });
    
    console.log('📋 SUPERVISORES:');
    console.log('----------------');
    resultados.forEach((result, index) => {
      const usuario = usuariosDePrueba[index];
      if (usuario.roles[0] === 'SUPERVISOR') {
        console.log(`👤 ${usuario.nombre} ${usuario.apellido_paterno}`);
        console.log(`   Usuario: ${usuario.username}`);
        console.log(`   Password: ${usuario.password}`);
        console.log(`   Descripción: ${usuario.descripcion}`);
        console.log('');
      }
    });
    
    // 10. Código de ejemplo para frontend
    console.log('🚀 CÓDIGO DE EJEMPLO PARA FRONTEND:');
    console.log('====================================\n');
    
    console.log(`// URL base de la API
const API_URL = 'http://localhost:3000/api';

// 1. Login de ejemplo
const loginEjemplo = async () => {
  const response = await fetch(\`\${API_URL}/auth/login\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'juan.conductor',
      password: 'Conductor123!'
    })
  });
  
  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.token);
    console.log('Usuario logueado:', data.usuario);
    return data;
  } else {
    throw new Error(data.error);
  }
};

// 2. Crear nuevo usuario (requiere token de admin)
const crearNuevoUsuario = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(\`\${API_URL}/usuarios-completos\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      nombre: "Nuevo",
      apellido_paterno: "Usuario",
      username: "nuevo.usuario",
      password: "Password123!",
      roles: ["CONDUCTOR"] // Opciones: ["ADMIN"], ["CONDUCTOR"], ["SUPERVISOR"]
    })
  });
  
  return await response.json();
};

// 3. Verificar token
const verificarToken = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(\`\${API_URL}/auth/verify\`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  
  return await response.json();
};

// 4. Obtener perfil
const obtenerPerfil = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(\`\${API_URL}/auth/profile\`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  
  return await response.json();
};
`);
    
    // 11. URLs importantes
    console.log('\n🌐 URLs IMPORTANTES:');
    console.log('===================\n');
    console.log('🔗 API Base: http://localhost:3000');
    console.log('📚 Swagger Docs: http://localhost:3000/api-docs');
    console.log('🔐 Login Endpoint: POST http://localhost:3000/api/auth/login');
    console.log('👥 Create User: POST http://localhost:3000/api/usuarios-completos');
    console.log('✅ Health Check: GET http://localhost:3000/health');
    
    console.log('\n✨ SEED FINAL COMPLETADO EXITOSAMENTE!');
    console.log('=======================================\n');
    console.log('🎮 ¡Ahora puedes probar con tu frontend usando las credenciales arriba!');
  }
}

// Ejecutar si es script principal
if (require.main === module) {
  const seed = new FinalSeedService();
  seed.run()
    .then(() => {
      console.log('\n✅ Proceso finalizado correctamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 ERROR CRÍTICO:', error.message || error);
      if (error.stack) {
        console.error('Stack trace:', error.stack.split('\n').slice(0, 5).join('\n'));
      }
      process.exit(1);
    });
}

export { FinalSeedService };