(() => {
  const USD_RATE = 4.42;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const params = new URLSearchParams(window.location.search);

  const preloader = document.getElementById("preloader");
  const preloaderBar = document.getElementById("preloader-bar");
  const preloaderCounter = document.getElementById("preloader-counter");
  const preloaderSkip = document.getElementById("preloader-skip");
  const scrollProgress = document.getElementById("scroll-progress");
  const siteHeader = document.getElementById("site-header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");

  const cards = Array.from(document.querySelectorAll(".car-card"));
  const carsEmpty = document.getElementById("cars-empty");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  const currBtns = Array.from(document.querySelectorAll(".curr-btn"));
  const savedTabCount = document.getElementById("saved-tab-count");
  const heroPriceVal = document.getElementById("hero-price-val");

  const specModal = document.getElementById("spec-modal");
  const smClose = document.getElementById("sm-close");
  const smImg = document.getElementById("sm-img");
  const smKicker = document.getElementById("sm-kicker");
  const smTitle = document.getElementById("sm-title");
  const smDesc = document.getElementById("sm-desc");
  const smEngine = document.getElementById("sm-engine");
  const smPower = document.getElementById("sm-power");
  const smTrans = document.getElementById("sm-trans");
  const smEco = document.getElementById("sm-eco");
  const smSpace = document.getElementById("sm-space");
  const smSafety = document.getElementById("sm-safety");
  const smColorName = document.getElementById("sm-color-name");
  const smSwatchRow = document.getElementById("sm-swatch-row");
  const smPrice = document.getElementById("sm-price");
  const smLoanBtn = document.getElementById("sm-loan-btn");
  const smReserveBtn = document.getElementById("sm-reserve-btn");

  const orderDrawer = document.getElementById("order-drawer");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const openOrderBtn = document.getElementById("open-order-btn");
  const drawerClose = document.getElementById("drawer-close");
  const drawerItems = document.getElementById("drawer-items");
  const headerOrderCount = document.getElementById("header-order-count");
  const drawerCountVal = document.getElementById("drawer-count-val");
  const drawerTotalVal = document.getElementById("drawer-total-val");
  const drawerDepositVal = document.getElementById("drawer-deposit-val");
  const drawerCheckoutForm = document.getElementById("drawer-checkout-form");
  const drawerFeedback = document.getElementById("drawer-feedback");

  const compareA = document.getElementById("compare-a");
  const compareB = document.getElementById("compare-b");
  const cmpImgA = document.getElementById("cmp-img-a");
  const cmpImgB = document.getElementById("cmp-img-b");
  const cmpTitleA = document.getElementById("cmp-title-a");
  const cmpTitleB = document.getElementById("cmp-title-b");
  const compareTable = document.getElementById("compare-table");

  const loanCarSelect = document.getElementById("loan-car-select");
  const loanDpRange = document.getElementById("loan-dp-range");
  const loanDpDisplay = document.getElementById("loan-dp-display");
  const tenureBtns = Array.from(document.querySelectorAll(".tenure-btn"));
  const loanRateSelect = document.getElementById("loan-rate-select");
  const loanTradeInput = document.getElementById("loan-trade-input");
  const loanMonthlyVal = document.getElementById("loan-monthly-val");
  const loanPrincipalVal = document.getElementById("loan-principal-val");
  const loanYearsVal = document.getElementById("loan-years-val");
  const loanReserveBtn = document.getElementById("loan-reserve-btn");

  const testdriveForm = document.getElementById("testdrive-form");
  const tdFeedback = document.getElementById("td-feedback");

  const studioStageShell = document.getElementById("studio-stage-shell");
  const studioTabs = Array.from(document.querySelectorAll(".studio-tab"));
  const studioCarImg = document.getElementById("studio-car-img");
  const studioCarName = document.getElementById("studio-car-name");
  const studioCarSpec = document.getElementById("studio-car-spec");
  const studioHeadlightCone = document.getElementById("studio-headlight-cone");
  const headlightToggleBtn = document.getElementById("headlight-toggle-btn");
  const lightBtns = Array.from(document.querySelectorAll(".light-btn"));
  const engineStartBtn = document.getElementById("engine-start-btn");
  const engineBtnLabel = document.getElementById("engine-btn-label");
  const engineRevBtn = document.getElementById("engine-rev-btn");
  const studioBuyBtn = document.getElementById("studio-buy-btn");
  const tachoNeedleGroup = document.getElementById("tacho-needle-group");
  const tachoArcLive = document.getElementById("tacho-arc-live");
  const tachoRpmText = document.getElementById("tacho-rpm-text");

  const bpPins = Array.from(document.querySelectorAll(".bp-pin"));
  const bpTabs = Array.from(document.querySelectorAll(".bp-tab"));
  const bpCode = document.getElementById("bp-code");
  const bpTitle = document.getElementById("bp-title");
  const bpDesc = document.getElementById("bp-desc");

  const state = {
    currency: "MYR",
    category: "All",
    search: "",
    sort: "featured",
    savedIds: new Set(
      JSON.parse(localStorage.getItem("perodua_saved") || "[]"),
    ),
    orders: JSON.parse(localStorage.getItem("perodua_orders") || "[]"),
    loanYears: 9,
    activeModalCarId: null,
    activeStudioCarId: "myvi-av",
    headlightsOn: false,
    engineRunning: false,
    revving: false,
    currentRpm: 0,
    targetRpm: 0,
  };

  const catalog = new Map();
  cards.forEach((card, index) => {
    const swatches = Array.from(card.querySelectorAll(".swatch-dot")).map(
      (btn) => ({
        color: btn.dataset.color || "Factory",
        hex: btn.style.getPropertyValue("--swatch") || "#888",
      }),
    );
    const activeSwatch = swatches[0] ? swatches[0].color : "Factory";
    const imgEl = card.querySelector(".car-media img");
    catalog.set(card.dataset.carId, {
      id: card.dataset.carId,
      index,
      el: card,
      name: card.dataset.name,
      cat: card.dataset.cat,
      priceMyr: Number(card.dataset.priceMyr || 0),
      power: Number(card.dataset.power || 0),
      torque: card.dataset.torque || "",
      eco: Number(card.dataset.eco || 0),
      engine: card.dataset.engine || "",
      trans: card.dataset.trans || "",
      safety: card.dataset.safety || "",
      boot: card.dataset.boot || "",
      clearance: card.dataset.clearance || "",
      warranty: card.dataset.warranty || "5 Yrs",
      rpmMax: Number(card.dataset.rpmMax || 6400),
      pitch: Number(card.dataset.pitch || 110),
      desc: card.dataset.desc || "",
      img: imgEl ? imgEl.getAttribute("src") : "./images/perodua-1.jpg",
      swatches,
      selectedColor: activeSwatch,
    });
  });

  function formatMoney(myr) {
    if (state.currency === "USD") {
      return `$${Math.round(myr / USD_RATE).toLocaleString("en-US")}`;
    }
    return `RM ${Math.round(myr).toLocaleString("en-US")}`;
  }

  function calcMonthlyMyr(
    priceMyr,
    dpPercent = 10,
    years = 9,
    rate = 2.85,
    tradeIn = 0,
  ) {
    const down = (priceMyr * dpPercent) / 100;
    const principal = Math.max(0, priceMyr - down - Math.max(0, tradeIn));
    const totalInterest = principal * (rate / 100) * years;
    const months = years * 12;
    return {
      principal,
      months,
      monthly:
        months > 0 ? Math.round((principal + totalInterest) / months) : 0,
    };
  }

  function animateHeroCounters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count || 0);
      const dec = el.dataset.decimal || "";
      if (reducedMotion) {
        el.textContent = `${target}${dec}`;
        return;
      }
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.round(target * eased)}${p === 1 ? dec : ""}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  let preloaderClosed = false;
  function finishPreloader() {
    if (preloaderClosed || !preloader) return;
    preloaderClosed = true;
    if (preloaderBar) preloaderBar.style.width = "100%";
    if (preloaderCounter) preloaderCounter.textContent = "100%";
    preloader.classList.add("is-done");
    preloader.setAttribute("aria-hidden", "true");
    animateHeroCounters();
  }

  if (params.get("autostart") === "1" || reducedMotion) {
    finishPreloader();
  } else {
    let pct = 0;
    const stepTimer = window.setInterval(() => {
      pct = Math.min(100, pct + 2);
      if (preloaderBar) preloaderBar.style.width = `${pct}%`;
      if (preloaderCounter) preloaderCounter.textContent = `${pct}%`;
      if (pct >= 100) {
        window.clearInterval(stepTimer);
        window.setTimeout(finishPreloader, 460);
      }
    }, 54);
    if (preloaderSkip) {
      preloaderSkip.addEventListener("click", () => {
        window.clearInterval(stepTimer);
        finishPreloader();
      });
    }
  }

  function updateScrollEffects() {
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    if (scrollProgress) {
      scrollProgress.style.width = `${Math.min(100, (scrollTop / maxScroll) * 100)}%`;
    }
    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", scrollTop > 24);
    }
  }

  window.addEventListener("scroll", updateScrollEffects, { passive: true });
  updateScrollEffects();

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const open = mobileDrawer.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", String(open));
      mobileDrawer.setAttribute("aria-hidden", String(!open));
    });
    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
      });
    });
  }

  const revealTargets = Array.from(
    document.querySelectorAll(".reveal-slow, .reveal-card"),
  );
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.classList.contains("car-card")) {
              const cardIndex = Number(el.dataset.revealOrder || 0);
              el.style.transitionDelay = `${(cardIndex % 4) * 95}ms`;
            }
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
    );
    cards.forEach((c, idx) => {
      c.dataset.revealOrder = String(idx);
    });
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (ev) => {
        const rect = card.getBoundingClientRect();
        const px = (ev.clientX - rect.left) / rect.width;
        const py = (ev.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * 7.5;
        const ry = (px - 0.5) * 9;
        card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      });
      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  function refreshPrices() {
    if (heroPriceVal) {
      heroPriceVal.textContent = formatMoney(59900);
    }
    catalog.forEach((car) => {
      const priceEl = car.el.querySelector("[data-price-display]");
      const monthlyEl = car.el.querySelector("[data-monthly-display]");
      const calc = calcMonthlyMyr(car.priceMyr, 10, 9, 2.85, 0);
      if (priceEl) priceEl.textContent = formatMoney(car.priceMyr);
      if (monthlyEl) monthlyEl.textContent = `${formatMoney(calc.monthly)}/mo`;
    });
    renderCompare();
    updateLoan();
    renderDrawer();
    if (state.activeModalCarId) {
      const modalCar = catalog.get(state.activeModalCarId);
      if (modalCar && smPrice)
        smPrice.textContent = formatMoney(modalCar.priceMyr);
    }
  }

  function syncSavedUI() {
    if (savedTabCount) savedTabCount.textContent = String(state.savedIds.size);
    cards.forEach((card) => {
      const favBtn = card.querySelector(".fav-btn");
      if (favBtn) {
        favBtn.classList.toggle(
          "active",
          state.savedIds.has(card.dataset.carId),
        );
      }
    });
    localStorage.setItem(
      "perodua_saved",
      JSON.stringify(Array.from(state.savedIds)),
    );
  }

  function applyCatalogFilterAndSort() {
    const grid = document.getElementById("cars-grid");
    if (!grid) return;
    const query = state.search.trim().toLowerCase();
    const list = Array.from(catalog.values());

    list.sort((a, b) => {
      if (state.sort === "price-asc") return a.priceMyr - b.priceMyr;
      if (state.sort === "price-desc") return b.priceMyr - a.priceMyr;
      if (state.sort === "eco") return b.eco - a.eco;
      if (state.sort === "power") return b.power - a.power;
      return a.index - b.index;
    });

    let visibleCount = 0;
    list.forEach((car) => {
      grid.appendChild(car.el);
      const matchesCat =
        state.category === "All" ||
        (state.category === "Saved"
          ? state.savedIds.has(car.id)
          : car.cat === state.category);
      const hay =
        `${car.name} ${car.cat} ${car.engine} ${car.safety}`.toLowerCase();
      const matchesSearch = !query || hay.includes(query);
      const show = matchesCat && matchesSearch;
      car.el.classList.toggle("is-hidden", !show);
      if (show) {
        visibleCount += 1;
        car.el.classList.add("is-visible");
      }
    });

    if (carsEmpty) carsEmpty.hidden = visibleCount > 0;
  }

  currBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.currency = btn.dataset.curr || "MYR";
      currBtns.forEach((b) => b.classList.toggle("active", b === btn));
      refreshPrices();
    });
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.category = btn.dataset.cat || "All";
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      applyCatalogFilterAndSort();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.search = searchInput.value;
      applyCatalogFilterAndSort();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      state.sort = sortSelect.value;
      applyCatalogFilterAndSort();
    });
  }

  cards.forEach((card) => {
    const car = catalog.get(card.dataset.carId);
    if (!car) return;

    const favBtn = card.querySelector(".fav-btn");
    if (favBtn) {
      favBtn.addEventListener("click", () => {
        if (state.savedIds.has(car.id)) {
          state.savedIds.delete(car.id);
        } else {
          state.savedIds.add(car.id);
        }
        syncSavedUI();
        if (state.category === "Saved") applyCatalogFilterAndSort();
      });
    }

    const swatchDots = Array.from(card.querySelectorAll(".swatch-dot"));
    const swatchLabel = card.querySelector(".swatch-label");
    swatchDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        swatchDots.forEach((d) => d.classList.toggle("active", d === dot));
        car.selectedColor = dot.dataset.color || "Factory";
        if (swatchLabel) swatchLabel.textContent = car.selectedColor;
      });
    });

    const specBtn = card.querySelector("[data-spec-id]");
    if (specBtn) {
      specBtn.addEventListener("click", () => openSpecModal(car.id));
    }

    const reserveBtn = card.querySelector("[data-reserve-id]");
    if (reserveBtn) {
      reserveBtn.addEventListener("click", () => {
        addToBooking(car.id);
        openOrderDrawer();
      });
    }
  });

  function openSpecModal(carId) {
    const car = catalog.get(carId);
    if (!car || !specModal) return;
    state.activeModalCarId = carId;
    if (smImg) {
      smImg.src = car.img;
      smImg.alt = car.name;
    }
    if (smKicker) smKicker.textContent = `PERODUA · ${car.cat.toUpperCase()}`;
    if (smTitle) smTitle.textContent = car.name;
    if (smDesc) smDesc.textContent = car.desc;
    if (smEngine) smEngine.textContent = car.engine;
    if (smPower) smPower.textContent = `${car.power} HP · ${car.torque}`;
    if (smTrans) smTrans.textContent = car.trans;
    if (smEco) smEco.textContent = `${car.eco} km/L`;
    if (smSpace) smSpace.textContent = `${car.boot} · ${car.clearance}`;
    if (smSafety) smSafety.textContent = car.safety;
    if (smColorName) smColorName.textContent = car.selectedColor;
    if (smPrice) smPrice.textContent = formatMoney(car.priceMyr);

    if (smSwatchRow) {
      smSwatchRow.innerHTML = "";
      car.swatches.forEach((sw) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = `swatch-dot${sw.color === car.selectedColor ? " active" : ""}`;
        b.style.setProperty("--swatch", sw.hex);
        b.setAttribute("aria-label", sw.color);
        b.addEventListener("click", () => {
          car.selectedColor = sw.color;
          if (smColorName) smColorName.textContent = sw.color;
          smSwatchRow
            .querySelectorAll(".swatch-dot")
            .forEach((d) => d.classList.toggle("active", d === b));
          const cardLabel = car.el.querySelector(".swatch-label");
          if (cardLabel) cardLabel.textContent = sw.color;
          car.el.querySelectorAll(".swatch-dot").forEach((d) => {
            d.classList.toggle("active", d.dataset.color === sw.color);
          });
        });
        smSwatchRow.appendChild(b);
      });
    }

    specModal.classList.add("open");
    specModal.setAttribute("aria-hidden", "false");
  }

  function closeSpecModal() {
    if (!specModal) return;
    specModal.classList.remove("open");
    specModal.setAttribute("aria-hidden", "true");
  }

  if (smClose) smClose.addEventListener("click", closeSpecModal);
  if (specModal) {
    specModal.addEventListener("click", (ev) => {
      if (ev.target === specModal) closeSpecModal();
    });
  }
  if (smLoanBtn) {
    smLoanBtn.addEventListener("click", () => {
      if (state.activeModalCarId && loanCarSelect) {
        loanCarSelect.value = state.activeModalCarId;
        updateLoan();
      }
      closeSpecModal();
      const loanEl = document.getElementById("loan-studio");
      if (loanEl) loanEl.scrollIntoView({ behavior: "smooth" });
    });
  }
  if (smReserveBtn) {
    smReserveBtn.addEventListener("click", () => {
      if (state.activeModalCarId) addToBooking(state.activeModalCarId);
      closeSpecModal();
      openOrderDrawer();
    });
  }

  function addToBooking(carId) {
    const car = catalog.get(carId);
    if (!car) return;
    const exists = state.orders.find(
      (o) => o.id === car.id && o.color === car.selectedColor,
    );
    if (!exists) {
      state.orders.push({
        uid: `${car.id}-${Date.now()}`,
        id: car.id,
        name: car.name,
        color: car.selectedColor,
        priceMyr: car.priceMyr,
        img: car.img,
      });
      localStorage.setItem("perodua_orders", JSON.stringify(state.orders));
    }
    renderDrawer();
  }

  function renderDrawer() {
    if (headerOrderCount)
      headerOrderCount.textContent = String(state.orders.length);
    if (drawerCountVal)
      drawerCountVal.textContent = String(state.orders.length);

    const totalMyr = state.orders.reduce((sum, item) => sum + item.priceMyr, 0);
    const depositMyr = state.orders.length * 500;
    if (drawerTotalVal) drawerTotalVal.textContent = formatMoney(totalMyr);
    if (drawerDepositVal)
      drawerDepositVal.textContent = formatMoney(depositMyr);

    if (!drawerItems) return;
    if (state.orders.length === 0) {
      drawerItems.innerHTML =
        '<div class="empty-state">No Perodua reserved yet.</div>';
      return;
    }

    drawerItems.innerHTML = "";
    state.orders.forEach((item) => {
      const row = document.createElement("div");
      row.className = "drawer-item";
      row.innerHTML = `
        <img src="${item.img}" alt="${item.name}" referrerpolicy="no-referrer" />
        <div>
          <div class="di-name">${item.name}</div>
          <div class="di-meta">${item.color} · ${formatMoney(item.priceMyr)}</div>
        </div>
        <button class="di-remove" type="button">Remove</button>
      `;
      row.querySelector(".di-remove").addEventListener("click", () => {
        state.orders = state.orders.filter((o) => o.uid !== item.uid);
        localStorage.setItem("perodua_orders", JSON.stringify(state.orders));
        renderDrawer();
      });
      drawerItems.appendChild(row);
    });
  }

  function openOrderDrawer() {
    if (!orderDrawer || !drawerBackdrop) return;
    orderDrawer.classList.add("open");
    orderDrawer.setAttribute("aria-hidden", "false");
    drawerBackdrop.classList.add("open");
    drawerBackdrop.setAttribute("aria-hidden", "false");
  }

  function closeOrderDrawer() {
    if (!orderDrawer || !drawerBackdrop) return;
    orderDrawer.classList.remove("open");
    orderDrawer.setAttribute("aria-hidden", "true");
    drawerBackdrop.classList.remove("open");
    drawerBackdrop.setAttribute("aria-hidden", "true");
  }

  if (openOrderBtn) openOrderBtn.addEventListener("click", openOrderDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeOrderDrawer);
  if (drawerBackdrop)
    drawerBackdrop.addEventListener("click", closeOrderDrawer);

  if (drawerCheckoutForm) {
    drawerCheckoutForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (state.orders.length === 0) {
        if (drawerFeedback)
          drawerFeedback.textContent = "Select a Perodua model first.";
        return;
      }
      const ref = `PRD-${Math.floor(100000 + Math.random() * 900000)}`;
      if (drawerFeedback) {
        drawerFeedback.textContent = `Confirmed (${ref}). Advisor will contact you shortly.`;
      }
      state.orders = [];
      localStorage.setItem("perodua_orders", "[]");
      renderDrawer();
      drawerCheckoutForm.reset();
    });
  }

  function renderCompare() {
    if (!compareA || !compareB || !compareTable) return;
    const carA = catalog.get(compareA.value);
    const carB = catalog.get(compareB.value);
    if (!carA || !carB) return;

    if (cmpImgA) cmpImgA.src = carA.img;
    if (cmpImgB) cmpImgB.src = carB.img;
    if (cmpTitleA) cmpTitleA.textContent = carA.name;
    if (cmpTitleB) cmpTitleB.textContent = carB.name;

    const rows = [
      [
        "Price",
        formatMoney(carA.priceMyr),
        formatMoney(carB.priceMyr),
        carA.priceMyr < carB.priceMyr
          ? "A"
          : carB.priceMyr < carA.priceMyr
            ? "B"
            : "",
      ],
      [
        "Power",
        `${carA.power} HP`,
        `${carB.power} HP`,
        carA.power > carB.power ? "A" : carB.power > carA.power ? "B" : "",
      ],
      [
        "Economy",
        `${carA.eco} km/L`,
        `${carB.eco} km/L`,
        carA.eco > carB.eco ? "A" : carB.eco > carA.eco ? "B" : "",
      ],
      ["Engine", carA.engine, carB.engine, ""],
      ["Gearbox", carA.trans, carB.trans, ""],
      ["Safety", carA.safety, carB.safety, ""],
    ];

    compareTable.innerHTML = rows
      .map(
        ([label, valA, valB, win]) => `
        <div class="cmp-row">
          <div class="cmp-key">${label}</div>
          <div class="cmp-val${win === "A" ? " win" : ""}">${valA}</div>
          <div class="cmp-val${win === "B" ? " win" : ""}">${valB}</div>
        </div>
      `,
      )
      .join("");
  }

  if (compareA) compareA.addEventListener("change", renderCompare);
  if (compareB) compareB.addEventListener("change", renderCompare);

  function updateLoan() {
    if (!loanCarSelect) return;
    const car = catalog.get(loanCarSelect.value);
    if (!car) return;
    const dpPct = Number(loanDpRange ? loanDpRange.value : 10);
    const rate = Number(loanRateSelect ? loanRateSelect.value : 2.85);
    const tradeIn = Number(loanTradeInput ? loanTradeInput.value : 0);
    const dpAmount = Math.round((car.priceMyr * dpPct) / 100);
    const result = calcMonthlyMyr(
      car.priceMyr,
      dpPct,
      state.loanYears,
      rate,
      tradeIn,
    );

    if (loanDpDisplay)
      loanDpDisplay.textContent = `${dpPct}% (${formatMoney(dpAmount)})`;
    if (loanMonthlyVal)
      loanMonthlyVal.textContent = `${formatMoney(result.monthly)} / mo`;
    if (loanPrincipalVal)
      loanPrincipalVal.textContent = formatMoney(result.principal);
    if (loanYearsVal) loanYearsVal.textContent = `${result.months} months`;
  }

  if (loanCarSelect) loanCarSelect.addEventListener("change", updateLoan);
  if (loanDpRange) loanDpRange.addEventListener("input", updateLoan);
  if (loanRateSelect) loanRateSelect.addEventListener("change", updateLoan);
  if (loanTradeInput) loanTradeInput.addEventListener("input", updateLoan);

  tenureBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.loanYears = Number(btn.dataset.years || 9);
      tenureBtns.forEach((b) => b.classList.toggle("active", b === btn));
      updateLoan();
    });
  });

  if (loanReserveBtn) {
    loanReserveBtn.addEventListener("click", () => {
      if (loanCarSelect) addToBooking(loanCarSelect.value);
      openOrderDrawer();
    });
  }

  if (testdriveForm) {
    testdriveForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const name = document.getElementById("td-name")?.value || "Guest";
      const model = document.getElementById("td-model")?.value || "Perodua";
      if (tdFeedback) {
        tdFeedback.textContent = `Test drive reserved for ${name} — ${model} at Perodua Sentral.`;
      }
      testdriveForm.reset();
    });
  }

  let audioCtx = null;
  let oscMain = null;
  let oscSub = null;
  let engineGain = null;
  let engineFilter = null;

  function ensureAudioNodes() {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return false;
    if (!audioCtx) {
      audioCtx = new AudioContextCtor();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return true;
  }

  function startEngineAudio() {
    if (!ensureAudioNodes()) return;
    stopEngineAudio();
    const car = catalog.get(state.activeStudioCarId);
    const basePitch = car ? car.pitch : 110;

    oscMain = audioCtx.createOscillator();
    oscSub = audioCtx.createOscillator();
    engineFilter = audioCtx.createBiquadFilter();
    engineGain = audioCtx.createGain();

    oscMain.type = "sawtooth";
    oscSub.type = "triangle";
    oscMain.frequency.setValueAtTime(basePitch * 0.48, audioCtx.currentTime);
    oscSub.frequency.setValueAtTime(basePitch * 0.24, audioCtx.currentTime);

    engineFilter.type = "lowpass";
    engineFilter.frequency.setValueAtTime(260, audioCtx.currentTime);
    engineGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    engineGain.gain.exponentialRampToValueAtTime(
      0.075,
      audioCtx.currentTime + 0.35,
    );

    oscMain.connect(engineFilter);
    oscSub.connect(engineFilter);
    engineFilter.connect(engineGain);
    engineGain.connect(audioCtx.destination);

    oscMain.start();
    oscSub.start();
  }

  function stopEngineAudio() {
    if (engineGain && audioCtx) {
      try {
        engineGain.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtx.currentTime + 0.16,
        );
      } catch (_e) {}
    }
    if (oscMain) {
      try {
        oscMain.stop(audioCtx ? audioCtx.currentTime + 0.18 : 0);
      } catch (_e) {}
      oscMain = null;
    }
    if (oscSub) {
      try {
        oscSub.stop(audioCtx ? audioCtx.currentTime + 0.18 : 0);
      } catch (_e) {}
      oscSub = null;
    }
  }

  function renderTachometer(rpm) {
    const car = catalog.get(state.activeStudioCarId);
    const maxRpm = car ? car.rpmMax : 6400;
    const clamped = Math.max(0, Math.min(maxRpm, rpm));
    const ratio = clamped / maxRpm;
    const deg = -120 + ratio * 240;
    const arcLen = 385;

    if (tachoNeedleGroup) {
      tachoNeedleGroup.setAttribute(
        "transform",
        `rotate(${deg.toFixed(1)} 120 135)`,
      );
    }
    if (tachoArcLive) {
      tachoArcLive.setAttribute(
        "stroke-dashoffset",
        String((arcLen * (1 - ratio)).toFixed(1)),
      );
    }
    if (tachoRpmText) {
      tachoRpmText.textContent = String(Math.round(clamped));
    }

    if (oscMain && oscSub && engineFilter && audioCtx && state.engineRunning) {
      const basePitch = car ? car.pitch : 110;
      const freq = basePitch * (0.42 + ratio * 2.15);
      oscMain.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.06);
      oscSub.frequency.setTargetAtTime(freq * 0.5, audioCtx.currentTime, 0.06);
      engineFilter.frequency.setTargetAtTime(
        220 + ratio * 980,
        audioCtx.currentTime,
        0.06,
      );
    }
  }

  let tachoRafId = 0;
  let lastRpmShown = -1;

  function tickTachometer() {
    const car = catalog.get(state.activeStudioCarId);
    const maxRpm = car ? car.rpmMax : 6400;
    if (state.engineRunning) {
      const jitter = Math.sin(performance.now() * 0.014) * 28;
      state.targetRpm = state.revving ? maxRpm * 0.94 : 880 + jitter;
    } else {
      state.targetRpm = 0;
    }
    const lerp = state.revving ? 0.16 : 0.1;
    state.currentRpm += (state.targetRpm - state.currentRpm) * lerp;
    if (!state.engineRunning && state.currentRpm < 12) {
      state.currentRpm = 0;
    }
    const rounded = Math.round(state.currentRpm);
    if (rounded !== lastRpmShown) {
      lastRpmShown = rounded;
      renderTachometer(state.currentRpm);
    }
    if (state.engineRunning || state.currentRpm > 0) {
      tachoRafId = requestAnimationFrame(tickTachometer);
    } else {
      tachoRafId = 0;
    }
  }

  function startTachoLoop() {
    if (!tachoRafId) {
      tachoRafId = requestAnimationFrame(tickTachometer);
    }
  }

  function selectStudioCar(carId) {
    const car = catalog.get(carId);
    if (!car) return;
    state.activeStudioCarId = carId;
    studioTabs.forEach((tab) =>
      tab.classList.toggle("active", tab.dataset.studioCar === carId),
    );
    if (studioCarImg) {
      studioCarImg.style.opacity = "0.35";
      window.setTimeout(() => {
        studioCarImg.src = car.img;
        studioCarImg.alt = `Perodua ${car.name} Live Studio`;
        studioCarImg.style.opacity = "1";
      }, 140);
    }
    if (studioCarName) studioCarName.textContent = car.name;
    if (studioCarSpec)
      studioCarSpec.textContent = `${car.engine} · ${car.power} HP`;
    const revSub = engineRevBtn ? engineRevBtn.querySelector("small") : null;
    if (revSub)
      revSub.textContent = `${car.rpmMax.toLocaleString("en-US")} RPM`;
  }

  studioTabs.forEach((tab) => {
    tab.addEventListener("click", () => selectStudioCar(tab.dataset.studioCar));
  });

  if (engineStartBtn) {
    engineStartBtn.addEventListener("click", () => {
      state.engineRunning = !state.engineRunning;
      state.revving = false;
      engineStartBtn.classList.toggle("running", state.engineRunning);
      engineStartBtn.setAttribute("aria-pressed", String(state.engineRunning));
      if (engineBtnLabel)
        engineBtnLabel.textContent = state.engineRunning ? "STOP" : "START";
      if (engineRevBtn) {
        engineRevBtn.disabled = !state.engineRunning;
        engineRevBtn.classList.remove("revving");
      }
      if (studioStageShell) {
        studioStageShell.classList.toggle(
          "engine-running",
          state.engineRunning,
        );
        studioStageShell.classList.remove("engine-revving");
      }
      if (state.engineRunning) {
        state.currentRpm = 2200;
        startEngineAudio();
      } else {
        stopEngineAudio();
      }
      startTachoLoop();
    });
  }

  let revPulseTimeout = null;
  function setRevving(active) {
    if (!state.engineRunning) return;
    state.revving = active;
    if (engineRevBtn) engineRevBtn.classList.toggle("revving", active);
    if (studioStageShell)
      studioStageShell.classList.toggle("engine-revving", active);
  }

  if (engineRevBtn) {
    engineRevBtn.addEventListener("pointerdown", () => setRevving(true));
    engineRevBtn.addEventListener("pointerup", () => setRevving(false));
    engineRevBtn.addEventListener("pointerleave", () => setRevving(false));
    engineRevBtn.addEventListener("click", () => {
      if (!state.engineRunning) return;
      window.clearTimeout(revPulseTimeout);
      setRevving(true);
      revPulseTimeout = window.setTimeout(() => setRevving(false), 680);
    });
  }

  lightBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.ambience || "obsidian";
      lightBtns.forEach((b) => b.classList.toggle("active", b === btn));
      if (studioStageShell) studioStageShell.dataset.light = mode;
    });
  });

  if (headlightToggleBtn) {
    headlightToggleBtn.addEventListener("click", () => {
      state.headlightsOn = !state.headlightsOn;
      headlightToggleBtn.classList.toggle("on", state.headlightsOn);
      headlightToggleBtn.setAttribute(
        "aria-pressed",
        String(state.headlightsOn),
      );
      headlightToggleBtn.textContent = state.headlightsOn
        ? "Headlights: On"
        : "Headlights: Off";
      if (studioHeadlightCone)
        studioHeadlightCone.classList.toggle("on", state.headlightsOn);
    });
  }

  if (studioBuyBtn) {
    studioBuyBtn.addEventListener("click", () => {
      addToBooking(state.activeStudioCarId);
      openOrderDrawer();
    });
  }

  const safetyModules = {
    asa: {
      code: "01 · Stereo Vision",
      title: "ASA 3.0 Pre-Collision Braking",
      desc: "Detects vehicles, pedestrians, and cyclists up to 120 km/h with automatic emergency braking.",
    },
    dnga: {
      code: "02 · High-Tensile Architecture",
      title: "DNGA Lightweight Chassis",
      desc: "Reinforced impact-absorbing frame delivering sharper cornering stability and quieter highway refinement.",
    },
    dcvt: {
      code: "03 · Split-Gear Transmission",
      title: "Dual-Mode D-CVT Drive",
      desc: "Switches seamlessly from smooth belt ratios to direct gear drive at highway speed for 27.4 km/L efficiency.",
    },
    srs: {
      code: "04 · 5-Star ASEAN NCAP",
      title: "6 SRS Airbags & VSC Control",
      desc: "Full cabin curtain protection paired with Vehicle Stability Control, Blind Spot Monitor, and Hill Hold Assist.",
    },
  };

  function selectSafetyModule(key) {
    const mod = safetyModules[key];
    if (!mod) return;
    if (bpCode) bpCode.textContent = mod.code;
    if (bpTitle) bpTitle.textContent = mod.title;
    if (bpDesc) bpDesc.textContent = mod.desc;
    bpPins.forEach((p) => p.classList.toggle("active", p.dataset.bp === key));
    bpTabs.forEach((t) => t.classList.toggle("active", t.dataset.bp === key));
  }

  bpPins.forEach((pin) =>
    pin.addEventListener("click", () => selectSafetyModule(pin.dataset.bp)),
  );
  bpTabs.forEach((tab) =>
    tab.addEventListener("click", () => selectSafetyModule(tab.dataset.bp)),
  );

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      closeSpecModal();
      closeOrderDrawer();
    }
  });

  syncSavedUI();
  refreshPrices();
  applyCatalogFilterAndSort();
})();
