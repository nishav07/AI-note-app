document.querySelectorAll("a[data-page]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.currentTarget.getAttribute("data-page");
    loadPage(page);
  });
});



document.addEventListener("DOMContentLoaded" , () => {
  loadPage("feed");
});




function loadPage(page) {
  fetch(`/components/${page}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
      initPage(page);
    });
}


function initPage(page) {
  if (page === "feed") {
    // initFeedPage();
    // initCommnetSec();
    likebtn();
    cmtBtn();
  } else if (page === "write") {
    initNotesPage();
  } else if (page === "profile") {
    initEditPage();
    initEditDataSender();
  } else if (page === ""){
    initFeedPage();
  }
}


function initEditPage(){
  const editbtn = document.querySelector(".editbtn")
  editbtn.addEventListener('click', () => {
    loadPage("edit")
  })

  document.addEventListener("click", (e) => {
  if (e.target.classList.contains("profile-tab")) {

    document.querySelectorAll(".profile-tab").forEach(btn => {
      btn.classList.remove("bg-gray-300");
      btn.classList.add("bg-gray-100");
    });

    e.target.classList.add("bg-gray-300");

    const tab = e.target.dataset.tab;

    document.querySelectorAll(".tab-content").forEach(c => {
      c.classList.add("hidden");
    });

    document.getElementById(tab).classList.remove("hidden");
  }
});
}



function initEditDataSender(){
  const btn1 = document.querySelector('#personalInfo')
  let userInfo = {};
  btn1.addEventListener('click', () => {
     document.querySelectorAll(".input").forEach(i => {
      let name = i.name;
      let value = i.value;
      userInfo[name] = value;
    });

  })

  console.log(userInfo);
}







function initNotesPage() {
  const publishBtn = document.getElementById("publishbtn");
  const draftBtn = document.getElementById("draftbtn");
  const myform = document.getElementById("myForm");

  if (!publishBtn || !myform) return;

  publishBtn.addEventListener("click", async () => {
    console.log('helllo from publish btn');
    let validity = myform.checkValidity();
    if (!validity) {
      myform.reportValidity();
      return;
    }

    let form = new FormData(myform);
    const { title, story } = Object.fromEntries(form.entries());

    await fetch("/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, story })
    });

    window.location.href = "/Dashboard";
  });

  

  draftBtn?.addEventListener("click", async () => {
    console.log('helllo draft btnnn');
    let validity = myform.checkValidity();
    if (!validity) {
      myform.reportValidity();
      return;
    }

    let form = new FormData(myform);
    const { title, story } = Object.fromEntries(form.entries());

    await fetch("/drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, story })
    });

    window.location.href = "/Dashboard";
  });
}


//-------------- comment secion logic----------------------------------------------------------------------


  
document.addEventListener("click", async(e) => {
 const btn = e.target.closest("button[data-type]");
if (!btn) return;

const page = btn.dataset.type;
const postID = btn.dataset.postid;
const userID = btn.dataset.userid;

console.log(postID);

const res = await fetch(`/Dashboard/${page}`,{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        postID:postID,
        userID:userID,
        page:page
      })
    })

    const data = await res.text();
    document.getElementById("cdisplay").innerHTML = data;
})


// function loadComments(page) {
//   fetch(`/Dashboard/${page}`)
//     .then(res => res.text())
//     .then(html => {
//       document.getElementById("cdisplay").innerHTML = html;
//     });
    
// }

//----------------------------------------------------------------------------------------------------------------

document.addEventListener("click", (e) => {
  if(e.target.matches("a[data-page]")){
    loadProfilePage("post");
  }
})

function loadProfilePage(page) {
  fetch(`/profile/${page}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("profile-content").innerHTML = html;
    });
}



document.addEventListener("click", (e) => {
  if (!e.target.matches("a[data-profile]")) return;
  e.preventDefault();

  
  const page = e.target.dataset.profile;
  loadProfilePage(page);

  document.querySelectorAll('#profile-box a')
    .forEach(a => a.classList.remove("border-b-2", "border-indigo-600", "text-indigo-600"));

  e.target.classList.add("border-b-2", "border-indigo-600", "text-indigo-600");
});


//------------------------ likes & commnet mechnaismssnwfjd,-----------------------------

function likebtn() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest("[data-like-btn]");
    if (!btn) return;

    btn.disabled = true;
    setTimeout(() => btn.disabled = false, 500);

    const postID = btn.dataset.postid;
    const userID = btn.dataset.userid;

    const icon = btn.querySelector("[data-like-icon]");
    const countSpan = btn.querySelector("[data-like-count]");


    const res = await fetch("/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postID, userID })
    });

    const data = await res.json();
    console.log("data", data);

    if (icon) {
      if (data.isliked === true) {
        icon.classList.add("text-red-500");
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      } else {
        icon.classList.remove("text-red-500");
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      }
    }


    if (countSpan) {
      countSpan.innerText = data.data;
    }
  });
}

//------------------------------------------- comments--------------------------------------------------------

let curr_post_id = null;
let curr_user_id = null;

function cmtBtn() {
  document.addEventListener("click", async(e) => {

    if (e.target.closest(".cmt-btn")) {
      const btn = e.target.closest(".cmt-btn");

      curr_post_id = btn.dataset.postid;
      curr_user_id = btn.dataset.userid;

      console.log("COMMENT BTN CLICK:", { curr_post_id, curr_user_id });

    }

    // const btn = e.target.closest("[data-cmt-btn]");
    // // const icon = btn.querySelector("[data-like-icon]");
    // const countSpan = btn.querySelector("[data-cmt-count]");



    if (e.target.closest("[data-send-btn]")) {
      const sendBtn = e.target.closest("[data-send-btn]");
      const wrapper = sendBtn.closest("#c-input");
      const input = wrapper.querySelector("[data-cmt-input]");

      const value = input.value.trim();

      console.log("INPUT VALUE:", value);

      if (value === "") return console.log("Empty comment");

      input.value = "";

      const res = fetch("/comments",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        postID:curr_post_id,
        userID:curr_user_id,
        comment:value
      })

    })

     const data = await res.json();
    console.log("cmt_data", data);

    // const btn = e.target.closest("[data-cmt-btn]");
    // if(!btn) return;

    // const countSpan = btn.querySelector("[data-cmt-count]");

    // console.log("data of comment count",data.data)

    // if (countSpan) {
    //   countSpan.innerText = "";
    // }
    }

  })
}

