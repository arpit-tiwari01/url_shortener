import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error);
    throw new Error("Unable to load urls");
  }
  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete Url");
  }

  return data;
}

export async function createUrl(
  { title, long_url, custom_url, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 7);
  const fileName = `qr-${short_url}`;

  try {
    const { error: storageError } = await supabase.storage
      .from("qrs")
      .upload(fileName, qrcode);

    if (storageError) {
      console.error("Storage Error:", storageError);
      throw new Error("Unable to upload qrcode");
    }

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    const { data, error } = await supabase
      .from("urls")
      .insert([
        {
          title,
          original_url: long_url,
          custom_url: custom_url || null,
          short_url,
          user_id,
          qr,
        },
      ])
      .select();

    if (error) {
      console.error("Insert Error:", error);
      throw new Error("Unable to create Url");
    }

    return data;
  } catch (err) {
    console.error("Create URL Function Error:", err);
    throw err;
  }
}

export async function getLongUrl(id){
  const {data , error} = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id}, id.eq.${id}`)
    .single();

    if(error){
      console.error(error);
      throw new Error("Unable to featch short url");
    }
    return data;
}

const parser = new UAParser();

  const storeCkick = async ({id,original_url}) => {
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
