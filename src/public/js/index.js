document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById("msgError").setAttribute("hidden", "true")
    const formData = {
        organizer: this.organizer.value,
        title: this.title.value,
        begindate: this.startTime.value,
        enddate: this.endTime.value,
        place: this.place.value,
        phone: this.phone.value,
        email: this.email.value,
        description: this.description.value,
    };

    leistrap.event.invoke("event:create", null, formData, function(result){
      const link = document.getElementById("iv")
      link.href = "/services/event/"+result.data.key
      link.click()
})

});