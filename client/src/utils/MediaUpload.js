import { createClient } from "@supabase/supabase-js";

const url = "https://zobajygfbazqalwmjfdz.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvYmFqeWdmYmF6cWFsd21qZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMjMyMjEsImV4cCI6MjA5OTY5OTIyMX0.9apHrR12K47eX68NZL80CasfX_CMZlDFtvNbnsiMusg";

const supabase = createClient(url, key);

export async function uploadFile(file) {
    
    const timeStamp = Date.now();
    const fileName = timeStamp + "-" + file.name;

    try {
        // 1.  Upload 
        const { data, error } = await supabase.storage 
            .from("images")
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        // 2. Upload කළ නිවැරදි fileName එක භාවිතා කර Public URL එක ලබා ගැනීම.
        const { data: urlData } = supabase.storage
            .from("images")
            .getPublicUrl(fileName); // මෙතන file.name වෙනුවට fileName භාවිතා කළ යුතුයි. 

        console.log("Public URL:", urlData.publicUrl);
        return urlData.publicUrl; // URL එක return කිරීම අනිවාර්යයි

    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}