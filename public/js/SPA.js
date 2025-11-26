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
    initFeedPage();
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


//-------------- comment secion toggle--------------------------------------------------------

document.addEventListener('click' , (e) => {
  if(e.target.matches("#cbtn")){
    const section = e.target.closest("#extraFeatures").querySelector("#cdisplay");
    section.classList.toggle("hidden");
  }
})

//  const cbtn = document.querySelector("#cbtn");
//     const cdisplay = document.querySelector("#cdisplay");

//     cbtn.addEventListener("click" , () => {
//         cdisplay.classList.toggle("hidden")
//     })


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

document.addEventListener("DOMContentLoaded", () => {
  loadProfilePage("post");
});

document.addEventListener("click", (e) => {
  if (!e.target.matches("a[data-profile]")) return;

  e.preventDefault();

  
  const page = e.target.dataset.profile;
  loadProfilePage(page);

 
  document.querySelectorAll('#profile-box a')
    .forEach(a => a.classList.remove("border-b-2", "border-indigo-600", "text-indigo-600"));

  e.target.classList.add("border-b-2", "border-indigo-600", "text-indigo-600");
});
