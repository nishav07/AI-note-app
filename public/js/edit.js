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
