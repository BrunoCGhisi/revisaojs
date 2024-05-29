import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [nome, setNome]         = useState("");
  const [senha, setSenha]         = useState("");
  const [cargos_id, setCargos_id]         = useState("");


    async function getClientes() {
        try {
          const response = await axios.get("http://localhost:3000/clientes")
          console.log("sdgjduioghuidgh")
          setLoading(false)
          setClientes(response.data.clientes)
    } catch (error) {
      new Error(error);
    } 
  
}

useEffect(() => {
  getClientes();
}, []);

async function addUser() {
  try {
    const response = await axios.post("http://localhost:3000/clientes", {
      nome: nome,
      senha: senha,
      cargos_id: cargos_id,
    });
    console.log(response); 
      if (response.status === 200) alert("usuário cadastro com sucesso!");
      getClientes();
  } catch (error) {
      new Error(error);
    }
}

return (
  <div>
    <h3> Teste de GET e POST ReactJS </h3>
    {loading && clientes.leght === 0 ? (
      <h3> Carregando... </h3>
    ) : (
      clientes.map((cliente) => {
        return (
          <div
            key={cliente.nome} //ele tem que pesquisar por alguma coisa, o certo é usar o ID, para a máquina não confundir
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid red",
              gap: 10,
              flexDirection: "column",
            }}
          >
            <span> Nome: {cliente.nome} </span>
            <span> Senha: {cliente.senha} </span>
            <span>ID cargos: {cliente.cargos_id} </span>
          </div>
        );
      })
    )}
    <input 
      type="text"
      id  ="nome"
      value ={nome}
      onChange ={(e) => setNome(e.target.value)}
    />

    <input 
      type="text"
      id  ="senha"
      value ={senha}
      onChange ={(e) => setSenha(e.target.value)}
    />

    <input 
      type="text"
      id  ="cargos_id"
      value ={cargos_id}
      onChange ={(e) => setCargos_id(e.target.value)}
    />

    <button onClick={addUser}> Adicionar Usuário </button>


  </div>

);
}

export default App
