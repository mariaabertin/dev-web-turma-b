<template>
    <div :class="['alert-box', classeSemantica]">
      <span class="alert-icon">{{ iconeCorrespondente }}</span>
      <span class="alert-text">{{ msg }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: "MensagemComponent",
    props: {
      msg: {
        type: String,
        required: true
      },
      tipo: {
        type: String,
        default: "sucesso" 
      }
    },
    computed: {
      classeSemantica() {
        const classes = {
          erro: "alert-erro",
          aviso: "alert-aviso",
          info: "alert-info",
          sucesso: "alert-sucesso"
        };
        return classes[this.tipo] || "alert-info";
      },
      iconeCorrespondente() {
        const icones = {
          erro: "❌",     // Vermelho
          aviso: "⚠️",    // Laranja
          info: "ℹ️",     // Azul
          sucesso: "✅"   // Verde
        };
        return icones[this.tipo] || "ℹ️";
      }
    }
  };
  </script>
  
  <style scoped>
  .alert-box {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 8px;
    margin: 20px auto;
    max-width: 750px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .alert-icon {
    font-size: 18px;
  }
  
  .alert-text {
    text-align: left;
  }
  
  .alert-erro {
    background-color: #ffebee;
    color: #c62828;
    border-left: 6px solid #f44336;
  }
  
  .alert-aviso {
    background-color: #fff3e0;
    color: #ef6c00;
    border-left: 6px solid #ff9800;
  }
  
  .alert-info {
    background-color: #e3f2fd;
    color: #1565c0;
    border-left: 6px solid #2196f3;
  }
  
  .alert-sucesso {
    background-color: #e8f5e9;
    color: #2e7d32;
    border-left: 6px solid #4caf50;
  }
  
   @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>