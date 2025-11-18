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
      // initPage(page);
    });
}


// function initPage(page) {
//   if (page === "feed") {
//     initFeedPage();
//   } else if (page === "write") {
//     initNotesPage();
//   } else if (page === "explore") {
//     initExplorePage();
//   } else if (page === ""){
//     initFeedPage();
//   }
// }

function initNotesPage() {
  const publishBtn = document.getElementById("publishbtn");
  const draftBtn = document.getElementById("draftbtn");
  const myform = document.getElementById("myForm");

  if (!publishBtn || !myform) return;

  publishBtn.addEventListener("click", async () => {
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
    const section = e.target.closet("#extraFeatures").querySelector("#cdisplay");
    section.classList.toggle("hidden");
  }
})

//  const cbtn = document.querySelector("#cbtn");
//     const cdisplay = document.querySelector("#cdisplay");

//     cbtn.addEventListener("click" , () => {
//         cdisplay.classList.toggle("hidden")
//     })


//----------------------------------------------------------------------------------------------------------------

document.querySelectorAll("a[data-profile]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.currentTarget.getAttribute("data-profile");
    loadProfilePage(page);
  });
});

document.addEventListener("DOMContentLoaded" , () => {
  loadProfilePage("post");
});


function loadProfilePage(page) {
  fetch(`/profile/${page}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("profile-content").innerHTML = html;
    });
}

document.addEventListener("click", (e) => {
  const tab = e.target.dataset.profile;
  if (!tab) return;

  e.preventDefault();
  loadProfilePage(tab);
});
