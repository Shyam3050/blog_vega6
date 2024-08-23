try {
  // Upload image to Firebase
  const imgRef = ref(imageDb, `files/${v4()}`);
  const uploadResult = await uploadBytes(imgRef, image);
  const imgUrl = await getDownloadURL(uploadResult.ref);

  // Prepare user data
  const userData = {
    title,
    image: imgUrl,
    description,
    userid: JSON.parse(localStorage.getItem("user")).data._id,
  };

  // Send data to backend
  const response = await fetch("https://blog-vega6.onrender.com/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    alert("Try Again");
  }

  const data = await response.json();

  // Handle success, maybe redirect to login or show a success message
} catch (error) {
  alert(error.message);
}
