'use client'; 
import { useState } from 'react';
import Link from 'next/link';
import { buscarObra, eliminarObra, finalizarObra, pendienteObra, habilitarObra } from "@/lib/clientes-api"; 
import styles from '../page.module.css'; 

export default function Obras() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [editingObra, setEditingObra] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  const handleSearch = async () => {
    const lista = await buscarObra(searchTerm);
    console.log(lista);
    setResults(lista);
  };

  const handleDelete = async (obraId) => {
    const confirmed = window.confirm('¿Seguro que quieres eliminar esta obra?');
    if (confirmed) {
      try {
        await eliminarObra(obraId);
        setResults(results.filter(obra => obra.id !== obraId));
        console.log(`Obra con ID ${obraId} eliminada`);
      } catch (error) {
        console.error('Error al eliminar la obra:', error);
      }
    }
  };

  const handleEdit = (obra) => {
    setEditingObra(obra);
    setNuevoEstado(obra.estado); // Establecer el estado actual en el dropdown
  };

  const handleUpdateEstado = async (obraId) => {
    try {
      let updatedObra;
      if (nuevoEstado === 'FINALIZADA') {
        updatedObra = await finalizarObra(obraId);
      } else if (nuevoEstado === 'PENDIENTE') {
        updatedObra = await pendienteObra(obraId);
      } else if (nuevoEstado === 'HABILITADA') {
        updatedObra = await habilitarObra(obraId);
      }

      setResults(results.map(obra => 
        obra.id === obraId ? { ...obra, estado: updatedObra.estado } : obra
      ));
      setEditingObra(null); // Limpiar la obra en edición
      console.log('Estado de obra actualizado');
    } catch (error) {
      console.error('Error al actualizar el estado de la obra:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Obras</h1>
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por número o dirección de obra" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
      </div>
      <Link href="/clientes/obra/new">
        <button className={styles.createButton}>Crear nueva Obra</button>
      </Link>
      <table className={styles.clientTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Remodelación</th>
            <th>ID cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map(obra => (
            <tr key={obra.id}>
              <td>
                <Link href={`/obras/${obra.id}`}>{obra.id}</Link>
              </td>
              <td>{obra.direccion}</td>
              <td>
                {editingObra?.id === obra.id ? (
                  <select 
                    value={nuevoEstado} 
                    onChange={(e) => setNuevoEstado(e.target.value)} 
                    className={styles.dropdown}
                  >
                    <option value="FINALIZADA">FINALIZADA</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="HABILITADA">HABILITADA</option>
                  </select>
                ) : (
                  obra.estado
                )}
              </td>
              <td>{obra.esRemodelacion ? 'Sí' : 'No'}</td>
              <td>{obra.cliente.id}</td>
              <td>
                {editingObra?.id === obra.id ? (
                  <button 
                    className={styles.saveButton} 
                    onClick={() => handleUpdateEstado(obra.id)}
                  >
                    Guardar
                  </button>
                ) : (
                  <>
                    <button 
                      className={styles.editButton} 
                      onClick={() => handleEdit(obra)}
                    >
                      Editar
                    </button>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => handleDelete(obra.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .deleteButton {
          background-color: #ff4d4f;
          color: white;
          border: none;
          padding: 4px 8px;
          cursor: pointer;
        }
        .deleteButton:hover {
          background-color: #d9363e;
        }
        .saveButton {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 4px 8px;
          cursor: pointer;
        }
        .saveButton:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}
/*'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarObra } from "@/lib/clientes-api"; 
import styles from '../page.module.css'; 

export default function Obras() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const lista = await buscarObra(searchTerm);
    console.log(lista);
    setResults(lista);
  };

  const handleDelete = async (obraId) => {
    
    const confirmed = window.confirm('¿Seguro que quieres eliminar esta obra?');
    
    if (confirmed) {
      try {
        await eliminarObra(obraId);
        setResults(results.filter(obra => obra.id !== obraId));
        console.log(`Obra with ID ${obraId} deleted`);
    
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Obras</h1>
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por número o dirección de obra" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
      </div>
      <Link href="/clientes/obra/new">
        <button className={styles.createButton}>Crear nueva Obra</button>
      </Link>
      <table className={styles.clientTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Remodelación</th>
            <th>ID cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map(obra => (
            <tr key={obra.id}>
              <td>
                <Link href={`/obras/${obra.id}`}>{obra.id}</Link>
              </td>
              <td>{obra.direccion}</td>
              <td>{obra.estado}</td>
              <td>{obra.esRemodelacion ? 'Sí' : 'No'}</td>
              <td>{obra.cliente.id}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDelete(obra.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        deleteButton {
          background-color: #ff4d4f;
          color: white;
          border: none;
          padding: 4px 8px;
          cursor: pointer;
        }
        deleteButton:hover {
          background-color: #d9363e;
        }
      `}</style>
    </div>
  );
}*/
