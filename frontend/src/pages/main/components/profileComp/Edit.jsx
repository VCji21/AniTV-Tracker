import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { update_backend, get_backend_data, backendApi } from '../../../../service/api';
import placeholder from "../../../../assets/images/defAvatar.png";

/* Edit user profile */
const Edit = () => {
  const [user, setUser] = useState({});

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isSubmitting } 
  } = useForm();
  
  const image = watch("image");
  const [preview, setPreview] = useState(null);
  const [previewd, setPreviewd] = useState(null);

  // Get user info
  useEffect(() => {
    const getInfo = async () => {
      const res = await get_backend_data(`/api/users/me`);
      setUser({
        username: res.username,
        bio: res.bio,
      })
      if (res.profile_image)
        setPreviewd(`${backendApi}/uploads/${res.profile_image}`);
    };
    getInfo();
  }, [])

  // Send multidata form
  const onSubmit = async (data) => {
    const formData = new FormData();

    // Check for size of image (max 5MB)
    if (data.image[0]?.size > 5242880) {
      alert("Can't update profile! File size should be less than 5 MB")
      return;
    }

    // Append image if exist
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    formData.append("username", data.username);
    formData.append("bio", data.bio);

    const res = await update_backend(`/api/users/me`, formData, true);

    alert(res.message);
  };


  return (
    <main className='p-10'>
      <h2 className="text-7xl pt-8 pb-24 font-bold">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-center gap-4 flex-wrap">

          {/* Take image input and show preview */}
          <div className="flex flex-col justify-center">
            <label htmlFor="imageInput" className="bg-zinc-400 w-48 h-48 rounded-full overflow-hidden border border-zinc-200 cursor-pointer flex items-center justify-center hover:opacity-90 transition">
              <img className="object-cover object-center" src={preview || previewd || placeholder} alt="Upload"/>
            </label>

            <input id="imageInput" type="file" accept="image/*"
              {...register("image", {
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }
              })}
              hidden />
            <div className="text-center pr-5 py-2 font-bold">Profile Picture</div>
          </div>

          {/* Take username and bio */}
          <div className="flex flex-col justify-center gap-2 max-w-[300px] w-[75vw]">
            <input className="inputs transparent-black-bg" defaultValue={user.username}
            { ...register("username", {
                min: {
                value: 1, 
                message: "Username is required!"
            }, 
            })} type="text" placeholder="User Name"/>
            {errors.username && <div>{errors.username.message}</div>}
            
            <textarea className="inputs transparent-black-bg !h-[136px]" placeholder="Bio" 
            { ...register("bio")} defaultValue={user.bio} 
            />
          </div>

        </div>
        <button className="mt-2 font-extrabold bg-zinc-700/70 border border-zinc-200 px-5 py-1 rounded-sm hover:bg-red-500" type="submit">Save</button>
      </form>
    </main>
  );
}

export default Edit