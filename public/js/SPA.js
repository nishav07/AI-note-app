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
  } else if (page === "explore") {
    initExplorePage();
  } else if (page === ""){
    initFeedPage();
  }
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

  

  draftBtn?.addEventListener("click", () => {
    console.log("draft button clicked");
  });
}


//-------------- comment secion logic----------------------------------------------------------------------



document.addEventListener("click", (e) => {
 const btn = e.target.closest("button[data-type]");
if (!btn) return;

const page = btn.dataset.type;
loadComments(page);
})

function loadComments(page) {
  fetch(`/Dashboard/${page}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("cdisplay").innerHTML = html;
    });
    
}

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
    setTimeout(() => btn.disabled = false, 300);

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





//  function cmtBtn(){
//   document.addEventListener("click", async(e) => {
//     const btn = e.target.closest("[data-cmt-btn]");
//     if (!btn) return;

//     const Btn = e.target.closest("[data-cmt]");

//     if(!Btn) return;

//     const sendBtn = Btn.querySelector("[data-cmt-send]")
//    if(!sendBtn) return

//    sendBtn.addEventListener("clickc",async(e) => {
//     const btn = e.target.closest("[data-cmt-btn]");
//      const postID = btn.dataset.postid;
//     const userID = btn.dataset.userid;
//     console.log("before");
//     const input = btn.querySelector("[data-cmt-input]");
//     console.log('after');
//     console.log(input.value)
//      const res = await fetch("/comments", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ postID, userID })
//     })
//    })
// })
// }


// function cmtbox2(postID,userID,inputVALUE){

// }