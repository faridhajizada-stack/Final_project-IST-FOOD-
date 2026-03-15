document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menulist2");

  const categoryMap = {
    "#Pizzas-list": "Pizzas",
    "#Burger-list": "Burger",
    "#Kebab-list": "Kebab",
    "#Drinks-list": "Drinks",
    "#Desserts-list": "Desserts",
    "#Qurrito-list": "Qurrito",
    "#Salads-list": "Salads",
    "#Grilled-list": "Grilledmeat",
    "#Vegeterian-list": "Vegeterian",
    "#Kidsmenu-list": "Kidsmenu"
  };

  const allSections = document.querySelectorAll(
    ".Pizzas, .Burger, .Kebab, .Drinks, .Desserts, .Qurrito, .Salads, .Grilledmeat, .Vegeterian, .Kidsmenu"
  );

  function hideAllSections() {
    allSections.forEach((section) => {
      section.style.display = "none";
    });
  }

  function showCategory(href) {
    hideAllSections();

    const className = categoryMap[href];
    const target = document.querySelector(href);

    if (className) {
      document.querySelectorAll("." + className).forEach((section) => {
        section.style.display = "flex";
      });
    }

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  hideAllSections();

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      showCategory(href);
    });
  });
});



  const openFormBtn = document.getElementById("openFormBtn");
  const formModal = document.getElementById("formModal");
  const closeFormBtn = document.getElementById("closeFormBtn");

  openFormBtn.addEventListener("click", function () {
    formModal.classList.add("active");
    document.body.classList.add("modal-open");
  });

  closeFormBtn.addEventListener("click", function () {
    formModal.classList.remove("active");
    document.body.classList.remove("modal-open");
  });

  formModal.addEventListener("click", function (e) {
    if (e.target === formModal) {
      formModal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      formModal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });





  const input = document.getElementById("address");
  const suggestions = document.getElementById("suggestions");

  suggestions.classList.add("hidden");

  let debounceTimer;

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    const query = input.value.trim();

    if (query.length < 3) {
      suggestions.innerHTML = "";
      suggestions.classList.add("hidden");
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
      const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=cz&accept-language=en&q=${encodeURIComponent(query)}`
);
        const data = await response.json();

        suggestions.innerHTML = "";

        if (!data.length) {
          suggestions.innerHTML = `<div class="suggestion-item">No address found</div>`;
          suggestions.classList.remove("hidden");
          return;
        }

        data.forEach((place) => {
          const div = document.createElement("div");
          div.className = "suggestion-item";
          div.textContent = place.display_name;

          div.addEventListener("click", () => {
            input.value = place.display_name;
            suggestions.innerHTML = "";
            suggestions.classList.add("hidden");
          });

          suggestions.appendChild(div);
        });

        suggestions.classList.remove("hidden");
      } catch (error) {
        suggestions.innerHTML = `<div class="suggestion-item">Error loading addresses</div>`;
        suggestions.classList.remove("hidden");
      }
    }, 300);
  });

  document.addEventListener("click", (e) => {
    if (!document.querySelector(".address-box").contains(e.target)) {
      suggestions.classList.add("hidden");
    }
  });

