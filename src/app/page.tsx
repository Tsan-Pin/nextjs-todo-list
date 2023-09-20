"use client"
import Image from 'next/image'
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Layout, { siteTitle } from '../../components/layout';
import {Button} from "react-bootstrap";
import  './app.css';
import React, { useState } from 'react';
// import InputForm from '../../components/InputForm';


export default function Home() {
// Initialize the input field as an empty string
  const [inputToDo, setInputToDo] = useState("");
  // Initialize the to-do list as an empty array
  const [toDoList, setToDoList] = useState([]);

  const [updateId, setUpdateId] = useState(0);

  // Add a to-do item when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    if (updateId){
      console.log(updateId);
      // 要用找到的id內的值回傳到輸入框並來編輯它
      // 先確認跟我們要尋找的Id是否相符
      // 它會詢問我們正在嘗試更新的待辦事項
      // 如果"是"已更新的，我們提供原始的Id並執行Input寫入的任何內容
      // 如果"不是"，我們就提供它的默認值
      const updateToDo = toDoList.find((i) => i.id === updateId);
      const updatedToDoList = toDoList.map((t) => t.id === updateToDo.id 
      ? (t = { id: t.id, inputToDo }) : {id: t.id, inputToDo: t.inputToDo}
      );
      setToDoList(updatedToDoList);
      setUpdateId(0);
      setInputToDo("");
      return
    }
    if (inputToDo !== "") {
      setToDoList([{ id: `${inputToDo}-${Date.now()}`, inputToDo }, ...toDoList]);
      setInputToDo(""); // Clear the input field

      } 

    }
    
    // 控制delete按鈕的函式
    // 將delete裡面的所有東西都做變量
    // 設置filter過濾器去抓清單的獨特id
    // 它將比較所有內容，如果與這個id匹配
    // 那麼它就會被刪除
    // 否則，如果不匹配這邊給不等於!==
    // 它將不會被刪除
    const handleDelete = (id) => {
      console.log(id);
      const deleteTodo = toDoList.filter((to) => to.id !== id);
      // 最後狀態需要更新回傳，將刪除傳遞給array
      // ...為擴展運算符號
      setToDoList([...deleteTodo]);
    };
    const handleUpdate = (id) => {
      const updateToDo = toDoList.find((i) => i.id === id);
      setInputToDo(updateToDo.inpuToDo);
      setUpdateId(id);
    };
    return (
      
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Layout home>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <div className="App">
          <div className='container'>
            {/* 待辦事項的輸入表單，提交按鈕觸發handleSubmit函式 */}
            <form className='toDoForm' onSubmit={handleSubmit}>
              {/* 新增待辦事項的輸入框，onChange每當輸入框改變時調用 */}
              <input type="text" value = {inputToDo} onChange={(e) => setInputToDo(e.target.value)}/>
              {/* 新增按鈕 */}
              <button type="sumbit">{updateId ? "Update" : "Add"}</button>
            </form>
            {/* 待辦清單顯示內容，t代表整個對象為輸入框內的inpuiToDo值 */}
            <ul className='allToDoList'>
              {toDoList.map((t) => (
                //  <li className='singleTodoTask'>
                <li className="singleTodoTask" key={t.id}>
                <span className='toDoText'>{t.inputToDo}</span>
                <Button onClick={() => handleUpdate(t.id)}>Update</Button>
                {/* <button>Delete</button> */}
                <Button onClick={() => handleDelete(t.id)}>Delete</Button>
              </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom_content}>
          <h1 className={`mb-3 text-2xl font-semibold`}> ～底部的東東～ </h1>
        </div>
        </Layout>
      </main>
    );
  }