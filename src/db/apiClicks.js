import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksforUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error){
    console.log(error);
    throw new Error("Unable to load clicks");
  }
  return data;
}
 

const parser = new UAParser();

  export const storeClick = async ({id,original_url}) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const responce = await fetch("https://ipapi.co/json/");
    const {city, country_name: country} = await responce.json();
    await supabase.from("clicks").insert([
      {
        url_id: id,
        original_url: original_url,
        device: device,
        city: city,
        country: country,
      }
    ]);
    window.location.href = original_url;
  } catch (error) {
    console.error("Store Click Error:", error);
    throw new Error("Unable to store click");
    
  }
  }


  // export  async function getClicksforUrls({user_id}){
  //   const {data, error} = await supabase
  //     .from("urls")
  //     .select("*")
  //     .eq("user_id", user_id)
      
  
  //     if(error){
  //       console.error(error);
  //       throw new Error("Unable to load urls");
  //     }
  
  //     return data;
  // }
