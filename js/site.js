/* Shared behavior: mobile nav toggle + current-page marker */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  var page = window.location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".site-nav a");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      links[i].setAttribute("aria-current", "page");
    }
  }

  /* Contact form: no backend yet — hand off to a pre-filled email instead */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var subject = encodeURIComponent(
        "[Website] " + (data.get("subject") || "General inquiry")
      );
      var body = encodeURIComponent(
        "Name: " + (data.get("name") || "") + "\n" +
        "Email: " + (data.get("email") || "") + "\n\n" +
        (data.get("message") || "")
      );
      window.location.href =
        "mailto:iuulj@iu.edu?subject=" + subject + "&body=" + body;
      var status = document.getElementById("form-status");
      if (status) {
        status.hidden = false;
        status.textContent =
          "Opening your email client with this message pre-filled. If nothing happens, write to us directly at iuulj@iu.edu.";
      }
    });
  }
})();
