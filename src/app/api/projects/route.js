import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, key);
}

// CREATE project
export async function POST(req) {
  try {
    const supabase = getSupabaseAdmin();
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const live_url = formData.get("live_url");
    const github_url = formData.get("github_url");
    const image = formData.get("image");

    let imageUrl = null;

    if (image) {
      const ext = image.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, image);

      if (uploadError) {
        return NextResponse.json(
          { error: uploadError.message },
          { status: 400 },
        );
      }

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from("projects")
      .insert([{ title, description, image: imageUrl, live_url, github_url }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// READ projects
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data: projects, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(projects);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// UPDATE project
export async function PATCH(req) {
  try {
    const supabase = getSupabaseAdmin();
    const { id, title, description, live_url, github_url } = await req.json();

    const { error } = await supabase
      .from("projects")
      .update({ title, description, live_url, github_url })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req) {
  try {
    const supabase = getSupabaseAdmin();
    const { id } = await req.json();

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
