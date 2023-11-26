import React, { useState, useEffect } from 'react';
import './App.css';
import tree from './binary.js';

export default function App() {
  const [nodeValue, setNodeValue] = useState(0);
  const [result, setResult] = useState('');
  const reg = /^\d+$/;

  const [showResult, setShowResult] = useState(false);

  const handledButton = async (e) => {
    e.preventDefault();
    const node = +e.target.value;

    if (reg.test(node)) {
      setNodeValue(+node);
    }
  };

  //map node trae los valores del nodo

  const removeButton = async (e) => {
    e.preventDefault();
    tree.remove(nodeValue);
    setResult(tree.toString());
  };

  const addButton = async (e) => {
    e.preventDefault();
    console.log(nodeValue);
    tree.add(nodeValue);
    setShowResult(true);
    setResult(tree.toString());
  };

  const printButton = async (e) => {
    e.preventDefault();
    console.log(tree.toArray().length);
    if (tree.toArray().length === 0) {
      setResult('El árbol está vacío');
    } else {
      setResult(tree.toString());
      console.log(tree.toArray());
    }
  };

  const searchButton = async (e) => {
    e.preventDefault();
    const find = tree.contains(nodeValue);
    console.log(find);
    if (find) {
      setResult('El nodo existe');
    } else {
      setResult('El nodo no existe');
    }
  };

  return (
    <div>
      <div className="max-w-sm mx-auto">
        <div>
          <input value={nodeValue} onChange={handledButton} className="w-20 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 mr-2 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
        </div>
        <button onClick={searchButton} className="text-[15px] absolute ml-12 mt-[-37px] h-[40px] text-center justify-center">
          Buscar nodo
        </button>
        <button className="text-[15px] absolute ml-[176px] mt-[-37px] h-[40px] text-center justify-center" onClick={printButton}>
          Imprimir árbol
        </button>
        <button className="text-[15px] absolute ml-[-190px] mt-[-37px] h-[40px] text-center justify-center" onClick={removeButton}>
          Remover nodo
        </button>
        <button className="text-[15px] absolute ml-[-325px] mt-[-37px] h-[40px] text-center justify-center" onClick={addButton}>
          Agregar nodo
        </button>
        <div className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Introduce un número</div>
      </div>

      {showResult ? <h1 className="mt-24  text-indigo-500 text-6xl ">[{result}]</h1> : null}
      <div id="network" style={{ width: '600px', height: '400px' }} />
    </div>
  );
}
