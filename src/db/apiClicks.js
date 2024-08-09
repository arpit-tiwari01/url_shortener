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
 