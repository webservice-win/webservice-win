import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { LuSaveAll } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import axios from "axios"
import Swal from "sweetalert2";

const Websiteedit = () => {
 const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } =
    useContext(Contextapi);
  const {id}=useParams();
  const [profileImage, setProfileImage] = useState("");
  const [featureValue2, setFeatureValue2] = useState("");
  const [features2, setFeatures2] = useState([]);
  const [category, setCategory] = useState([]);
  const [technology, setTechnology] = useState([]);
    const [zipFile, setZipFile] = useState(null);
     const [fileError, setFileError] = useState("");
       const [uploading, setUploading] = useState(false);
        const [uploadProgress, setUploadProgress] = useState(0);
const [form, setForm] = useState({
  category: '',
  technology: '',
  title: '',
  tutorialtitle:'',
  note:'',
  tutorialLink: '',
  tutorialLink2:'',
  tutorialLink3:'',
  tutorialLink4:'',
  demoFrontend: '',
  demoBackend: '',
  singleLicense: '',
  unlimitedLicense: '',
  bettinglicense:'',
  details: '',
  likeNumber: 0, // New Field
  loveNumber: 0, // New Field
});

  const base_url="https://admin-api.oraclesoft.org";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get(`${base_url}/admin/all-category`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setCategory(categoryRes.data.data);

        const technologyRes = await axios.get(`${base_url}/admin/all-technology`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setTechnology(technologyRes.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // -----------------unlimited featires-
  const [featureValue, setFeatureValue] = useState("");
  const [features, setFeatures] = useState([]);
  const [banner2,set_banner2]=useState();
  const [banner3,set_banner3]=useState();
  const [banner4,set_banner4]=useState();
  const [banner5,set_banner5]=useState();
  const [banner6,set_banner6]=useState();
  const [unlimitedFeatureValue, setUnlimitedFeatureValue] = useState("");
  const [unlimitedFeatures, setUnlimitedFeatures] = useState([]);

  const [bettingFeatureValue, setBettingFeatureValue] = useState("");
  const [bettingFeatures, setBettingFeatures] = useState([]);

  const addFeature = () => {
    if (featureValue.trim()) {
      setFeatures([...features, featureValue]);
      setFeatureValue("");
    }
  };

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const addUnlimitedFeature = () => {
    if (unlimitedFeatureValue.trim()) {
      setUnlimitedFeatures([...unlimitedFeatures, unlimitedFeatureValue]);
      setUnlimitedFeatureValue("");
    }
  };

  const removeUnlimitedFeature = (index) => {
    const updatedUnlimitedFeatures = unlimitedFeatures.filter((_, i) => i !== index);
    setUnlimitedFeatures(updatedUnlimitedFeatures);
  };

  const addBettingFeature = () => {
    if (bettingFeatureValue.trim()) {
      setBettingFeatures([...bettingFeatures, bettingFeatureValue]);
      setBettingFeatureValue("");
    }
  };

  const removeBettingFeature = (index) => {
    const updatedBettingFeatures = bettingFeatures.filter((_, i) => i !== index);
    setBettingFeatures(updatedBettingFeatures);
  };

  // --------------------------betting features------------
   const [file,set_file]=useState();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
    set_file(file)

      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
 const handleZipFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        setZipFile(file);
        setFileError("");
      } else {
        setFileError("Only .zip files are allowed.");
        setZipFile(null);
      }
    }
  };

  const addFeature2 = () => {
    if (featureValue.trim()) {
      setFeatures((prev) => [...prev, featureValue.trim()]);
      setFeatureValue("");
    }
  };

  const removeFeature2 = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
     const [features_value,set_features]=useState([]);
const [oursite,set_oursite]=useState([]);
  const [content, setContent] = useState('');
   const [error, setError] = useState(null);
    const get_oursite=()=>{
        axios.get(`${base_url}/admin/single-website-details/${id}`)
        .then((res)=>{
            if(res.data.success){
                set_oursite(res.data.data);
                set_features(res.data.data.features);
                setContent(res.data.data.details);
                console.log(res.data.data.features);
                setProfileImage(`${base_url}/images/${res.data.data.thumbnail}`);
                set_banner2(res.data.data.banner2)
                set_banner3(res.data.data.banner3)
                set_banner4(res.data.data.banner4)
                set_banner5(res.data.data.banner5)
                set_file(res.data.data.thumbnail)
                         setForm({
               category: `${res.data.data.category}`,
    technology: `${res.data.data.technology}`,
    title: `${res.data.data.title}`,
    tutorialLink:  `${res.data.data.tutorialLink}`,
    demoFrontend:  `${res.data.data.demoFrontend}`,
    demoBackend:  `${res.data.data.demoBackend}`,
    singleLicense:`${res.data.data.singleLicense}`,
    unlimitedLicense: `${res.data.data.unlimitedLicense}`,
    details: `${res.data.data.details}`,
    note: `${res.data.data.note}`,
    tutorialLink2:`${res.data.data.tutorialLink2}`,
    tutorialLink3:`${res.data.data.tutorialLink3}`,
    tutorialLink4:`${res.data.data.tutorialLink4}`,
    tutorialtitle:`${res.data.data.tutorialtitle}`,
    bettinglicense:`${res.data.data.bettinglicense}`,
    likeNumber:`${res.data.data.like}`,
    loveNumber:`${res.data.data.love}`
            })
            setFeatures(res.data.data.features);
            setZipFile(res.data.data.zipFile)
            setUnlimitedFeatures(res.data.data.unlimitedfeatures)
            setBettingFeatures(res.data.data.bettingfeatures);
             
            }
        }).catch((err)=>{
            console.log(err.name)
        })
    };
    useEffect(()=>{
        get_oursite()
    },[]);
 const [category_value,set_categoryvalue]=useState("");
 const [technology_value,set_technologyvalue]=useState("");
const handleSubmit = async (e) => {
  e.preventDefault();
  const {
    category,
    technology,
    title,
    tutorialLink,
    tutorialLink2,
    tutorialLink3,
    tutorialLink4,
    tutorialtitle,
    note,
    demoFrontend,
    demoBackend,
    singleLicense,
    unlimitedLicense,
    bettinglicense,
    details,
    likeNumber,
    loveNumber
  } = form;

  if (
    !profileImage ||
    !category ||
    !technology ||
    !title ||
    !tutorialLink ||
    !demoFrontend ||
    !demoBackend ||
    !singleLicense ||
    !unlimitedLicense ||
    !details ||
    features.length === 0 ||
    !zipFile
  ) {
    Swal.fire("Error", "Please fill out all required fields.", "error");
    return;
  } else if (
    category !== "" &&
    technology !== "" &&
    title !== "" &&
    tutorialLink !== "" &&
    tutorialLink2 !== "" &&
    tutorialLink3 !== "" &&
    tutorialLink4 !== "" &&
    demoFrontend !== "" &&
    demoBackend !== "" &&
    singleLicense !== "" &&
    unlimitedLicense !== "" &&
    bettinglicense !== "" &&
    details !== ""
  ) {
    // Initialize the form data
    const formdata = new FormData();
    formdata.append("category", category);
    formdata.append("technology", technology);
    formdata.append("title", title);
    formdata.append("tutorialLink", tutorialLink);
    formdata.append("tutorialLink2", tutorialLink2);
    formdata.append("tutorialLink3", tutorialLink3);
    formdata.append("tutorialLink4", tutorialLink4);
    formdata.append("tutorialtitle", tutorialtitle);
    formdata.append("demoFrontend", demoFrontend);
    formdata.append("demoBackend", demoBackend);
    formdata.append("singleLicense", singleLicense);
    formdata.append("unlimitedLicense", unlimitedLicense);
    formdata.append("bettinglicense", bettinglicense);
    formdata.append("note", note);
    formdata.append("details", details);
    formdata.append("file", file);
    formdata.append("banner2", banner2);
    formdata.append("banner3", banner3);
    formdata.append("banner4", banner4);
    formdata.append("banner5", banner5);
    formdata.append("banner6", banner6);
    formdata.append("zipFile", zipFile);
    formdata.append("like", likeNumber);
    formdata.append("love", loveNumber);

    features.forEach((feature, index) => {
      formdata.append(`features[${index}]`, feature);
    });

    unlimitedFeatures.forEach((feature, index) => {
      formdata.append(`unlimitedfeatures[${index}]`, feature);
    });

    bettingFeatures.forEach((feature, index) => {
      formdata.append(`bettingfeatures[${index}]`, feature);
    });

    // Show progress bar modal
    Swal.fire({
      title: "Uploading...",
      html: "Please wait while your data is being uploaded.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Submit the form data
    try {
      const response = await axios.post(`${base_url}/admin/update-website/${id}`, formdata, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          Swal.update({
            html: `Uploading... ${percentCompleted}% completed.`,
          });
        },
      });

      // Close the progress bar after submission
      Swal.close();

      if (response.data.success === true) {
        setUploading(false);
        get_oursite();
        Swal.fire("Successful", `${response.data.message}`, "success");
      } else {
        Swal.fire("Error", `${response.data.message}`, "error");
      }
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
      console.log(err);
    }
  }
};


  // Modules for ReactQuill
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
    ["image"], // Add image button to toolbar
    [{ 'font': [] }], // Add font size control
    [{ 'size': ['small', 'medium', 'large', 'huge'] }], // Define available text sizes
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "color",
  "background",
  "link",
  "image",
  "font",
  "size",
];


    // ------------------handle-form--------------
    
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
       <div className='w-full flex justify-between items-center'>
        <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Add Website</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
             <li>Websites</li>
            <li><IoIosArrowForward/></li>
            <li>Add Website</li>
          </ul>
        </div>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>

            {/* -------------------form---------------------- */}
  <form onSubmit={handleSubmit} className="pt-[15px] lg:pt-[20px]">
            <div className="relative w-[60%] lg:w-[50%] xl:w-[30%] h-[200px] mb-[30px]">
              <div className="w-full h-full rounded-[10px] overflow-hidden border-2 border-gray-300">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full "
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                    <span className="text-sm">Upload Image</span>
                  </div>
                )}
              </div>
              <label
                htmlFor="profileImageInput"
                className="absolute bottom-1 right-2 bg-blue-600 text-white p-3 rounded-[5px] cursor-pointer hover:bg-blue-700"
              >
                <FaCamera className="w-4 h-4" />
              </label>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

           <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:mb-[20px] lg:flex-row flex-col">
  <div className="w-[100%] lg:w-[50%]">
    <label className="text-[15px] font-[500] text-gray-600">
      Select Category<span className="text-red-500">*</span>
    </label>
    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] px-[15px]"
    >
      <option value="" disabled>Select Category</option> {/* Add "Select One" option */}
      {category.map((data) => (
        <option key={data.value} value={data.value}>
          {data.label}
        </option>
      ))}
    </select>
  </div>

  <div className="w-[100%] lg:w-[50%]">
    <label className="text-[15px] font-[500] text-gray-600">
      Select Technology <span className="text-red-500">*</span>
    </label>
    <select
      name="technology"
      value={form.technology}
      onChange={handleChange}
      className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] px-[15px]"
    >
      <option value="" disabled>Select Technology</option> {/* Add "Select One" option */}
      {technology.map((data) => (
        <option key={data.value} value={data.value}>
          {data.label}
        </option>
      ))}
    </select>
  </div>
</div>
    {/* Title and Note */}
      <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
        <div className="w-[100%]">
          <label className="text-[15px] font-[500] text-gray-600">
            Note <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="note"
            placeholder="Note"
            value={form.note}
            onChange={handleChange}
            className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
          />
        </div>
      </div>
            <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>

            <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Tutorial Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="tutorialLink"
                  value={form.tutorialLink}
                  onChange={handleChange}
                  placeholder="Tutorial Link"
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>
                 <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  First Banner<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="tutorialLink"
                  placeholder="First Banner"
                  onChange={(e)=>{set_banner2(e.target.files[0])}}
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] border-[1px] border-[#eee] p-[10px]"
                />
              </div>
            </div>
                <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Second Banner<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="tutorialLink"
                  placeholder="First Banner"
                  onChange={(e)=>{set_banner3(e.target.files[0])}}
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] border-[1px] border-[#eee] p-[10px]"
                />
              </div>
            </div>
                <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Third Banner<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="tutorialLink"
                  placeholder="First Banner"
                  onChange={(e)=>{set_banner4(e.target.files[0])}}
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] border-[1px] border-[#eee] p-[10px]"
                />
              </div>
            </div>
                <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Fourth Banner<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  onChange={(e)=>{set_banner5(e.target.files[0])}}
                  placeholder="First Banner"
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] border-[1px] border-[#eee] p-[10px]"
                />
              </div>
            </div>
                <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Fifth Banner<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="tutorialLink"
                  placeholder="First Banner"
                  onChange={(e)=>{set_banner6(e.target.files[0])}}
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] border-[1px] border-[#eee] p-[10px]"
                />
              </div>
            </div>
     <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Tutorial Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tutorialtitle"
                  placeholder="Tutorial Title"
                value={form.tutorialtitle}
                onChange={handleChange}
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>
   <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  First Video Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tutorialLink2"
                  placeholder="Tutorial Title"
                value={form.tutorialLink2}
                onChange={handleChange}
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>
   <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  First Video Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tutorialLink3"
                  placeholder="Tutorial Title"
                value={form.tutorialLink3}
                onChange={handleChange}
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>
               <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Third Video Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tutorialLink4"
                  placeholder="Tutorial Title"
                value={form.tutorialLink4}
                onChange={handleChange}
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>
            <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Demo Frontend Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="demoFrontend"
                  value={form.demoFrontend}
                  onChange={handleChange}
                  placeholder="Demo Frontend Link"
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>

            <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Demo Backend Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="demoBackend"
                  value={form.demoBackend}
                  onChange={handleChange}
                  placeholder="Demo Backend Link"
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>

            <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Single License Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="singleLicense"
                  value={form.singleLicense}
                  onChange={handleChange}
                  placeholder="Single License Price"
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>

            <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Unlimited License Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="unlimitedLicense"
                  value={form.unlimitedLicense}
                  onChange={handleChange}
                  placeholder="Unlimited License Price"
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>
         <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Betting Website Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="bettinglicense"
               value={form.bettinglicense}
                onChange={handleChange}
                  placeholder="Betting Website Price"
                  className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
              </div>
            </div>
  {/* Add Like Number and Love Number Fields */}
  <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px] lg:flex-row flex-col">
    <div className="w-[100%] lg:w-[50%]">
      <label className="text-[15px] font-[500] text-gray-600">
        Like Number <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        name="likeNumber"
        value={form.likeNumber}
        onChange={handleChange}
        placeholder="Enter Like Number"
        className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
      />
    </div>
    <div className="w-[100%] lg:w-[50%]">
      <label className="text-[15px] font-[500] text-gray-600">
        Love Number <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        name="loveNumber"
        value={form.loveNumber}
        onChange={handleChange}
        placeholder="Enter Love Number"
        className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
      />
    </div>
  </div>

  {/* Rest of the Form */}
            <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[20px]">
              <div className="w-[100%]">
                <label className="text-[15px] font-[500] text-gray-600">
                  Details <span className="text-red-500">*</span>
                </label>
                <ReactQuill
                  value={form.details}
                   modules={modules}
          formats={formats}
           style={{ height: "250px" }}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, details: value }))
                    
                  }
                  className="w-full mt-[8px] "
                />
              </div>
            </div>

            <div className="w-full  mt-[60px] mb-[10px]">
              <label className="text-[15px] font-[500] text-gray-600">
               Single License Features <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center mt-[8px] gap-[10px]">
                <input
                  type="text"
                  value={featureValue}
                  placeholder='Enter features'
                  onChange={(e) => setFeatureValue(e.target.value)}
                  className="w-full rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                />
                <div
                  type="button"
                  onClick={addFeature}
                  className="bg-blue-600 h-[45px] flex justify-center items-center cursor-pointer  text-white px-[20px] py-[10px] rounded-[5px]"
                >
                  <FiPlus className="text-[22px]" />
                </div>
              </div>
              <ul className="mt-[10px]">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mt-[5px] bg-gray-100 p-[10px] rounded-[5px]"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
             <div className="">
   

      {/* Unlimited License Features */}
      <div className="w-full mt-[10px] mb-[10px]">
        <label className="text-[15px] font-[500] text-gray-600">
          Unlimited License Features <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center mt-[8px] gap-[10px]">
          <input
            type="text"
            value={unlimitedFeatureValue}
            placeholder="Enter unlimited features"
            onChange={(e) => setUnlimitedFeatureValue(e.target.value)}
            className="w-full rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
          />
          <div
            onClick={addUnlimitedFeature}
            className="bg-blue-600 h-[45px] flex justify-center items-center cursor-pointer text-white px-[20px] py-[10px] rounded-[5px]"
          >
            <FiPlus className="text-[22px]" />
          </div>
        </div>
        <ul className="mt-[10px]">
          {unlimitedFeatures.map((feature, index) => (
            <li
              key={index}
              className="flex justify-between items-center mt-[5px] bg-gray-100 p-[10px] rounded-[5px]"
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => removeUnlimitedFeature(index)}
                className="text-red-500"
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Betting Website Features */}
      <div className="w-full mt-[10px] mb-[20px]">
        <label className="text-[15px] font-[500] text-gray-600">
          Betting Website Features <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center mt-[8px] gap-[10px]">
          <input
            type="text"
            value={bettingFeatureValue}
            placeholder="Enter betting website features"
            onChange={(e) => setBettingFeatureValue(e.target.value)}
            className="w-full rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
          />
          <div
            onClick={addBettingFeature}
            className="bg-blue-600 h-[45px] flex justify-center items-center cursor-pointer text-white px-[20px] py-[10px] rounded-[5px]"
          >
            <FiPlus className="text-[22px]" />
          </div>
        </div>
        <ul className="mt-[10px]">
          {bettingFeatures.map((feature, index) => (
            <li
              key={index}
              className="flex justify-between items-center mt-[5px] bg-gray-100 p-[10px] rounded-[5px]"
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => removeBettingFeature(index)}
                className="text-red-500"
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
 {/* Zip File Upload */}
      <div className="relative w-full mb-[30px]">
        <div className="w-full h-[150px] rounded-[10px] overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
          {zipFile ? (
            <div className="text-gray-700 text-center">
              <p className="font-medium">{zipFile.name}</p>
              <p className="text-sm text-gray-500">{(zipFile.size / 1024).toFixed(2)} KB</p>
            </div>
          ) : (
            <div className="text-gray-500">Upload Zip File</div>
          )}
        </div>
        <label htmlFor="zipFileInput" className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-[5px] cursor-pointer hover:bg-blue-700">
          Select File
        </label>
        <input type="file" id="zipFileInput" accept=".zip" className="hidden" onChange={handleZipFileUpload} />
      </div>
      {fileError && <p className="text-red-500 text-sm mb-4">{fileError}</p>}

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-gray-200 h-2 rounded-md mb-4">
          <div className="bg-blue-600 h-2 rounded-md" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}

            <button
              type="submit"
              className="bg-blue-600 text-white py-[15px] w-full rounded-[5px] text-[18px]"
            >
              Submit
            </button>
          </form>

            {/* -------------------form---------------------- */}
         </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Websiteedit