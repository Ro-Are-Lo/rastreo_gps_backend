// scripts/test-api.js
const axios = require('axios');
const API_BASE = 'http://localhost:3000/api';

class ApiTester {
  constructor() {
    this.token = null;
    this.testData = {};
  }

  async login(username = 'admin', password = 'admin123') {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        username,
        password
      });
      
      this.token = response.data.token;
      console.log('✅ Login exitoso');
      return true;
    } catch (error) {
      console.log('❌ Error en login:', error.response?.data?.message);
      return false;
    }
  }

  getHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async testPersona() {
    console.log('\n🧑 Probando módulo Persona...');
    
    const personaData = {
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      genero: 'M'
    };

    try {
      // Crear
      const crearRes = await axios.post(`${API_BASE}/personas`, personaData, {
        headers: this.getHeaders()
      });
      
      this.testData.personaId = crearRes.data.id;
      console.log(`✅ Persona creada - ID: ${this.testData.personaId}`);

      // Listar
      const listarRes = await axios.get(`${API_BASE}/personas`, {
        headers: this.getHeaders()
      });
      
      console.log(`✅ Listar personas - Total: ${listarRes.data.total}`);
      return true;
    } catch (error) {
      console.log('❌ Error en persona:', error.response?.data);
      return false;
    }
  }

  async testVehiculo() {
    console.log('\n🚗 Probando módulo Vehículo...');
    
    const vehiculoData = {
      placa: 'TEST-' + Math.floor(Math.random() * 1000),
      modelo: 'Toyota Test',
      anio: 2023
    };

    try {
      const response = await axios.post(`${API_BASE}/vehiculos`, vehiculoData, {
        headers: this.getHeaders()
      });
      
      this.testData.vehiculoId = response.data.id;
      console.log(`✅ Vehículo creado - Placa: ${response.data.placa}`);
      return true;
    } catch (error) {
      console.log('❌ Error en vehículo:', error.response?.data);
      return false;
    }
  }

  async testUbicacion() {
    console.log('\n📍 Probando módulo Ubicación...');
    
    if (!this.testData.vehiculoId) {
      console.log('⚠️  No hay vehículo creado, omitiendo...');
      return false;
    }

    const ubicacionData = {
      id_vehiculo: this.testData.vehiculoId,
      latitud: -17.7833 + (Math.random() * 0.01),
      longitud: -63.1821 + (Math.random() * 0.01),
      velocidad_kmh: Math.floor(Math.random() * 80) + 20
    };

    try {
      const response = await axios.post(`${API_BASE}/ubicaciones`, ubicacionData, {
        headers: this.getHeaders()
      });
      
      console.log(`✅ Ubicación registrada - Lat: ${response.data.latitud}, Lon: ${response.data.longitud}`);
      return true;
    } catch (error) {
      console.log('❌ Error en ubicación:', error.response?.data);
      return false;
    }
  }

  async runAllTests() {
    console.log('🚀 Iniciando pruebas de API...\n');
    
    if (!await this.login()) {
      console.log('⚠️  Continuando sin autenticación...');
    }

    const tests = [
      () => this.testPersona(),
      () => this.testVehiculo(),
      () => this.testUbicacion()
    ];

    let passed = 0;
    for (const test of tests) {
      if (await test()) passed++;
    }

    console.log(`\n🎉 Resultado: ${passed}/${tests.length} pruebas exitosas`);
    process.exit(passed === tests.length ? 0 : 1);
  }
}

// Ejecutar pruebas
const tester = new ApiTester();
tester.runAllTests();