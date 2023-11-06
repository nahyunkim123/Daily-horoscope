'use client'
import Image from "next/image"
import React, { useEffect, useState } from "react"
import Clover from './../public/images/clover-leaf.png'
import Clover1 from './../public/images/clover.png'
import Clover2 from './../public/images/clover (1).png'


interface Content {
  name: string;
  keyword?: string;
  desc: string;
  index: string;
}


export default function Home() {

  const [gender, setGender] = useState<string>("")
  const [birthDate, setBirthDate] = useState<string>("")
  const [month, setMonth] = useState<string>("1")
  const [time, setTime] = useState<string>("")


  const [resultToday, setResultToday] = useState(null)
  const [resultTom, setResultTom] = useState(null)
  const [resultMonth, setResultMonth] = useState(null)
  const [result, setResult] = useState<Content[]>([])



  const fetchData = async ()=>{
    try {
      const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`);
      const data = await res.json();
      
      if (data.result.day.content.length === 0) {
        alert("옵션을 선택해주세요.");
      } else {
        setResultToday(data.result.day.title);
        setResultTom(data.result.tomorrow.title);
        setResultMonth(data.result.month.title);
        setResult(data.result.day.content);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      alert("데이터를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  }

  const birthChange = ((e: React.ChangeEvent<HTMLInputElement>) =>{
      const value = e.target.value;
      if(value.length <= 8 && /^[0-9]*$/.test(value)){
        setBirthDate(value)
      }

  })

  

  return (
    <div className="w-full text-center mt-4 pb-8">
      <div className="mx-auto w-4/5 mt-[100px]">

        <div className="w-[200px] h-[200px] rounded-full border mx-auto animate-rotate">
          <Image className="mx-auto" width={150} height={150} src={Clover} alt="300x300"/>
          <h2 className="text-md font-bold">오늘의 운세</h2>
        
        </div>
        <div className="flex mt-[40px]  md:border rounded-lg p-5 flex-wrap w-full mx-auto justify-center items-center">
          <div className="w-full md:w-1/5 mx-auto flex justify-evenly">
            <button className={`py-2 basis-[48%]  border rounded-xl ${gender === 'm' ? 'bg-green-500' : ''}`} onClick={() => setGender("m")}>남성</button>
            <button className={`py-2 basis-[48%] border rounded-xl ${gender === 'f' ? 'bg-green-500' : ''}`} onClick={() => setGender("f")}>여성</button>
          </div>
          <div className="basis-full md:basis-2/5 flex items-center mt-4">
            <span className="basis-1/5">생년월일</span>
            <input className="border py-2 rounded-md basis-4/5" onChange={birthChange} value={birthDate} type="text" placeholder="생년월일 8자리를 입력해주세요"/>
          </div>
          <div className="basis-full md:basis-2/5 flex items-center mt-4">
            <span className="basis-1/5">달</span>
            <select onChange={(e) => setMonth(e.target.value)} value={month} className="border py-2 rounded-md basis-4/5">
              <option value="1">양력</option>
              <option value="2">음력 평달</option>
              <option value="3">음력 윤달</option>
            </select>
          </div>
          <div className="basis-full md:basis-2/5 flex items-center mt-4">
            <span className="basis-1/5">시간</span>
            <select className="border rounded-md py-2 basis-4/5" value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">모름</option>
              <option value="0">子(자) 23:30 ~ 01:29</option>
              <option value="0">丑(축) 01:30 ~ 03:29</option>
              <option value="0">寅(인) 03:30 ~ 05:29</option>
              <option value="0">卯(묘) 05:30 ~ 07:29</option>
              <option value="0">辰(진) 07:30 ~ 09:29</option>
              <option value="0">巳(사) 09:30 ~ 11:29</option>
              <option value="0">未(미) 13:30 ~ 15:29</option>
              <option value="0">申(신) 15:30 ~ 17:29</option>
              <option value="0">酉(유) 17:30 ~ 19:29</option>
              <option value="0">戌(술) 19:30 ~ 21:29</option>
              <option value="0">亥(해) 21:30 ~ 23:29</option>

            </select>
          </div>
          <div className="basis-full md:basis-1/5 md:ml-3 flex items-center mt-4">
            <button className="border w-full py-2 transition-[0.5s] rounded-xl bg-green-500 hover:bg-slate-700 hover:text-white" onClick={fetchData}>확인</button>
          </div>
        </div>


          
      
            {
              result && result.map((e,i)=>{
                return(
                <div key={i} className="w-4/5 h-auto leading-[45px] p-[20px] mx-auto mt-6 border rounded-md">
                  <div className="flex flex-wrap" >
                    <p className="border-b font-bold">{e.name}</p>
                    <p>{e.desc}</p>
                  </div>
                </div>
                )
              })
            }

      </div>
    </div>
  )
}
