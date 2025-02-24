// Função para buscar a temperatura do ESP32
async function getTemperature(camera) {
    try {
        const response = await fetch("http://192.168.100.118/temperatura"); // IP do seu ESP32
        const data = await response.json();
  
        if (camera === 'Congelado') {
            return {
                sensor1: `${data.sensor1Congelado}°C`, 
                sensor2: `${data.sensor2Congelado}°C`
            }; // Temperaturas de congelado
        } else if (camera === 'Refriados') {
            return {
                sensor1: `${data.sensor1Refrigerado}°C`,
                sensor2: `${data.sensor2Refrigerado}°C`
            }; // Temperaturas de refrigerado
        }
    } catch (error) {
        console.error("Erro ao obter a temperatura:", error);
        return { sensor1: "Erro", sensor2: "Erro" }; // Em caso de erro
    }
  }
  
  // Atualiza a temperatura a cada 5 segundos
  setInterval(async () => {
    const tempCongelado = await getTemperature('Congelado');
    document.getElementById('tempCongelado-sensor1').innerText = tempCongelado.sensor1;
    document.getElementById('tempCongelado-sensor2').innerText = tempCongelado.sensor2;
  
    const tempRefriados = await getTemperature('Refriados');
    document.getElementById('tempRefriados-sensor1').innerText = tempRefriados.sensor1;
    document.getElementById('tempRefriados-sensor2').innerText = tempRefriados.sensor2;
  }, 5000);
  
  // Função para controlar os relés
  async function controlarRele(rele, estado) {
    try {
        // Envia uma requisição GET para o ESP32 com o relé e o estado
        const response = await fetch(`http://192.168.100.118/controlar_rele?rele=${rele}&estado=${estado}`);
        
        // Verifica a resposta
        if (response.ok) {
            alert(`${rele.charAt(0).toUpperCase() + rele.slice(1)} está agora ${estado}`);
        } else {
            alert("Erro ao controlar o relé");
        }
    } catch (error) {
        console.error("Erro ao controlar o relé:", error);
        alert("Erro de conexão");
    }
  }
  
  // Função para exibir as funções da câmara e esconder o restante
  function showCameraFunctions(camera) {
  document.getElementById('tempContainer').style.display = 'none';
  document.getElementById('camerasContainer').style.display = 'none';
  document.getElementById('functionsContainer').style.display = 'block';
  
  if (camera === 'Congelado') {
      document.getElementById('functionsCongelado').style.display = 'block';
      document.getElementById('functionsRefriados').style.display = 'none';
  } else if (camera === 'Refriados') {
      document.getElementById('functionsRefriados').style.display = 'block';
      document.getElementById('functionsCongelado').style.display = 'none';
  }
  }
  
  // Função para voltar para a tela inicial
  function closeFunctions() {
  document.getElementById('tempContainer').style.display = 'block';
  
  let camerasContainer = document.getElementById('camerasContainer');
  camerasContainer.style.display = 'flex';
  
  document.getElementById('functionsContainer').style.display = 'none';

  }