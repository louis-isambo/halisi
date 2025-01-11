

  // Fonction pour générer la liste des événements
  const EVENTS = {}
  function renderEvents(events) {
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "";

    events.forEach((event, index) => {
      const row = document.createElement("tr");
      const key = event.id
      EVENTS[key] = event.key
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${event.title}</td>
        <td>${event.begindate.replaceAll("-", "/").replace("T", " A ")}</td>
        <td onclick="openMenu(${key})">
          <div class="menu-wrapper">
            <button class="menu-button">⋮</button>
            <div class="menu-options hide" id="${key}">
              <button onclick="viewGuests(${key})">Voir Invités</button>
              <button onclick="redirectToAddGuest(${key})">Ajouter Invité</button>
              <button onclick="deleteEvent(${event.id})">Supprimer</button>
               <button style="background:#ee0000; color:#fff">Fermer</button>
            </div>
          </div>
        </td>
      `;
      eventsList.appendChild(row);
    });
  }

  // Fonction pour afficher les invités d'un événement
  function viewGuests(eventId) {
  
    leistrap.event.invoke("event:guests", null, EVENTS[eventId], function(data){
      
    const guestList = document.getElementById("guest-list");
    guestList.innerHTML = "";

    data.data.forEach((guest, index) => {
      const guestItem = document.createElement("li");
      guestItem.innerHTML = `
        <span>${index + 1}. ${guest.name}</span>
        <div class="menu-wrapper">
          <button class="menu-button" >⋮</button>
          <div class="menu-options hide">
            <button onclick="renameGuest(${eventId}, ${index})">Renommer</button>
            <button onclick="deleteGuest(${eventId}, ${index})">Supprimer</button>
          </div>
        </div>
      `;
      guestList.appendChild(guestItem);
    });

    document.getElementById("guest-modal").style.display = "flex";
    })
    
  }

  // Fonction pour filtrer les invités
  function filterGuests() {
    const searchValue = document.getElementById("search-box").value.toLowerCase();
    const guestItems = document.querySelectorAll("#guest-list li");

    guestItems.forEach(item => {
      const guestName = item.querySelector("span").textContent.toLowerCase();
   
      
      item.style.display = guestName.includes(searchValue) ? "flex" : "none";
    });
  }

  // Fonction pour rediriger vers l'interface d'ajout d'invité
  function redirectToAddGuest(key) {
    window.location.href =  EVENTS[key]+ "/";
  }

  // Fonction pour supprimer un invité
  function deleteGuest(eventId, guestIndex) {
    const event = events.find(e => e.id === eventId);
    event.guests.splice(guestIndex, 1);
    alert("Invité supprimé !");
    viewGuests(eventId);
  }

  // Fonction pour renommer un invité
  function renameGuest(eventId, guestIndex) {
    const newName = prompt("Entrez le nouveau nom de l'invité :");
    if (newName) {
      const event = events.find(e => e.id === eventId);
      event.guests[guestIndex] = newName;
      alert("Invité renommé !");
      viewGuests(eventId);
    }
  }

  // Fonction pour fermer la modale
  function closeModal() {
    document.getElementById("guest-modal").style.display = "none";
  }

  // Fonction pour supprimer un événement
  function deleteEvent(eventId) {
    const eventIndex = events.findIndex(e => e.id === eventId);
    events.splice(eventIndex, 1);
    alert("Événement supprimé !");
    renderEvents();
  }


  function openMenu(e){
   const elem= document.getElementById(e)
   
   document.querySelectorAll(".menu-options").forEach(function(item){
    item.classList.add("hide")
   })

   elem.classList.remove("hide")

   if(!elem.dis){
    elem.dis = true
    elem.addEventListener("click", function(e){
      e.stopPropagation()
     document.querySelectorAll(".menu-options").forEach(function(item){
      item.classList.add("hide")
     })
    })
   }
    

 
  }

  // // Initialisation
  // renderEvents();
  // const events = [
  //   { id: 1, name: "Mariage de Jean", date: "2024-12-20", guests: ["Alice", "Bob", "Charlie"] },
  //   { id: 2, name: "Anniversaire de Clara", date: "2025-01-15", guests: ["David", "Emma", "Fiona"] }
  // ];


  leistrap.event.invoke("events", null, function(data){
    
      renderEvents(data.data);
  })
