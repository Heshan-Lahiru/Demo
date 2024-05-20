import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import "./adminshowevent.css";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminShowEvent() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // State for filtered events
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getEvents");
      setEvents(response.data);
      setFilteredEvents(response.data); // Initially set filtered events to all events
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (eventId) => {
    axios
      .delete(`http://localhost:3001/deleteEvent/${eventId}`)
      .then(() => {
        // Update the events list after successful deletion
        fetchEvents();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.trim().toLowerCase()); // Trim whitespace
  };

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const filtered = events.filter((event) =>
      event.location.toLowerCase().includes(trimmedSearchTerm)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  return (
    <>
      <div className="admin-panel" style={{ display: "flex" }}>
        <div className="left-panel">
        <button><a style={{ color: 'white' }} href='/adminhome'>Users</a></button>
          <button><a style={{ color: 'white' }} href='/adminticket'>Ticket Booking</a></button>
          <button><a style={{ color: 'white' }} href='/adminservices'>Services</a></button>
          <button><a style={{ color: 'white' }} href='/adminshowservices'>Show Services</a></button>
          <button><a style={{ color: 'white' }} href='/adminshowevent'>Events</a></button>
          <button><a style={{ color: 'white' }} href='/adminhelp'>Help</a></button>   </div>
        <div className="right-panel" style={{ flexGrow: 1, overflow: 'auto' }}>
          <div className="top-right-section">
            <div className="blue-box">
              <input
                type="text"
                placeholder="Search by Location..."
                onChange={handleSearch}
              />
            </div>
            <h1>Hello Admin</h1>
            <hr />
          </div>

          <section className="recent padding">
            <div className="container">
              <Heading
                style={{ fontFamily: "Courier, monospace" }}
                title="Admin Panel Events"
                subtitle=""
              />

              <div className="content grid3 mtop">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (  // Use filteredEvents instead of events
                    <div className="box shadow" key={event._id}>
                      <div className="img">
                        <img
                          style={{ height: "400px" }}
                          src={`./images/event/${event.image}`}
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <div className="category flex">
                          <span>{event.category}</span>
                          <i className="fa fa-heart"></i>
                        </div>
                        <h4>{event.eventName}</h4>
                        <p>
                          <i className="fa fa-location-dot"></i> {event.location}
                        </p>
                      </div>
                      <div className="button flex">
                        <div>
                          <button
                            style={{ backgroundColor: "#E00947" }}
                            className="btn2"
                            onClick={() => handleDelete(event._id)}
                          >
                            Delete
                          </button>
                        </div>
                        <Link to={`/adminupdateevent/${event._id}`}>
                          <button
                            style={{ backgroundColor: "white", color: "black" }}
                            className="btn2"
                          >
                            Update
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No events found for your search location.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AdminShowEvent;
