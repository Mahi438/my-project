import React, { useState } from "react";
import "./Plan.css";
import { db } from "../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Charges for each travel option
const travelCharges = {
  Jaipur: {
    Udaipur: {
      Bus: {
        "Shatabdi Travels": 500,
        "Rajasthan Roadways": 450,
        "Raj Express Bus": 550,
      },
      Train: {
        "Chetak Express": 400,
        "Jaipur-Udaipur Intercity": 350,
        "Ranthambore Express": 420,
      },
    },
    Jodhpur: {
      Bus: {
        "Jodhpur Deluxe": 600,
        "Bluecity Travels": 580,
      },
      Train: {
        "Mandore Express": 500,
        "Jodhpur-Jaipur Intercity": 520,
      },
    },
    Jaisalmer: {
      Bus: {
        "Desert Express": 700,
        "Jaisalmer Travels": 750,
      },
      Train: {
        "Leelan Express": 600,
        "Howrah-Jaisalmer Express": 650,
      },
    },
  },
  Udaipur: {
    Jaipur: {
      Bus: {
        "Rajasthan Express": 480,
        "Mewar Travels": 520,
      },
      Train: {
        "Udaipur-Jaipur SF": 430,
        "Chetak Express": 400,
      },
    },
    Jodhpur: {
      Bus: {
        "Udaipur-Jodhpur Express": 400,
        "Lake City Bus": 420,
      },
      Train: {
        "Udaipur City Express": 390,
        "Runicha Express": 410,
      },
    },
    Jaisalmer: {
      Bus: {
        "Desert Cruiser": 800,
        "Udaipur Express": 750,
      },
      Train: {
        "Udaipur-Jaisalmer Intercity": 700,
        "Thar Express": 720,
      },
    },
  },
  Jodhpur: {
    Jaipur: {
      Bus: {
        "Rajputana Travels": 560,
        "Jodhpur Deluxe": 600,
      },
      Train: {
        "Mandore Express": 500,
        "Jodhpur-Jaipur SF": 520,
      },
    },
    Udaipur: {
      Bus: {
        "Jodhpur-Udaipur Express": 450,
        "Desert Travels": 470,
      },
      Train: {
        "Ranakpur Express": 430,
        "Jodhpur-Udaipur Passenger": 400,
      },
    },
    Jaisalmer: {
      Bus: {
        "Desert Safari Bus": 680,
        "Jaisalmer Superfast": 700,
      },
      Train: {
        "Leelan Express": 600,
        "Thar Link Express": 620,
      },
    },
  },
  Jaisalmer: {
    Jaipur: {
      Bus: {
        "Golden Fort Travels": 720,
        "Jaipur-Jaisalmer Deluxe": 740,
      },
      Train: {
        "Jaisalmer Express": 680,
        "Rajasthan Sampark Kranti": 700,
      },
    },
    Udaipur: {
      Bus: {
        "Desert Valley Bus": 790,
        "Udaipur Line": 770,
      },
      Train: {
        "Udaipur-Jaisalmer Express": 710,
        "Thar Express": 720,
      },
    },
    Jodhpur: {
      Bus: {
        "Jaisalmer-Jodhpur Express": 600,
        "Desert King Bus": 630,
      },
      Train: {
        "Jaisalmer-Jodhpur Mail": 580,
        "Howrah-Jodhpur Express": 600,
      },
    },
  },
};

const Plan = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    mode: "",
    travelName: "",
    date: "",
    passengers: "",
    mobile: "",
  });

  const [fareDetails, setFareDetails] = useState({
    perPerson: 0,
    total: 0,
  });

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);

    const perPerson =
      travelCharges[updated.from]?.[updated.to]?.[updated.mode]?.[updated.travelName] || 0;
    const total = perPerson * (parseInt(updated.passengers) || 0);
    setFareDetails({ perPerson, total });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { perPerson, total } = fareDetails;

    try {
      await addDoc(collection(db, "planTrip"), {
        ...formData,
        perPerson,
        total,
        timestamp: new Date(),
      });

      alert("✅ Booking Confirmed!");

      setFormData({
        from: "",
        to: "",
        mode: "",
        travelName: "",
        date: "",
        passengers: "",
        mobile: "",
      });

      setFareDetails({ perPerson: 0, total: 0 });
    } catch (error) {
      console.error("Error adding booking: ", error);
      alert("❌ Failed to submit. Please try again.");
    }
  };

  const travelOptions =
    formData.from && formData.to && formData.mode
      ? Object.keys(travelCharges[formData.from]?.[formData.to]?.[formData.mode] || {})
      : [];

  return (
    <div className="plan-container">
      <div className="plan-box">
        <h1>Plan Your Journey</h1>
        <form onSubmit={handleSubmit} className="plan-form">
          <label>From:</label>
          <select name="from" value={formData.from} onChange={handleChange} required>
            <option value="">--Select City--</option>
            {Object.keys(travelCharges).map((city, i) => (
              <option key={i} value={city}>{city}</option>
            ))}
          </select>

          <label>To:</label>
          <select name="to" value={formData.to} onChange={handleChange} required>
            <option value="">--Select Destination--</option>
            {formData.from &&
              Object.keys(travelCharges[formData.from] || {}).map((city, i) => (
                <option key={i} value={city}>{city}</option>
              ))}
          </select>

          <label>Mode of Travel:</label>
          <select name="mode" value={formData.mode} onChange={handleChange} required>
            <option value="">--Select Mode--</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
          </select>

          <label>Travel Option:</label>
          <select
            name="travelName"
            value={formData.travelName}
            onChange={handleChange}
            required
            disabled={!travelOptions.length}
          >
            <option value="">--Select Travel--</option>
            {travelOptions.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>

          <label>Travel Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label>No. of Passengers:</label>
          <input type="number" name="passengers" value={formData.passengers} onChange={handleChange} required />

          <label>Mobile Number:</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

          <button type="submit" className="plan-btn">Confirm Booking</button>
        </form>

        {/* 👇 Fare Summary Show Here */}
        {fareDetails.total > 0 && (
          <div className="fare-summary">
            <h3>🧾 Fare Summary</h3>
            <p><strong>Fare per person:</strong> ₹{fareDetails.perPerson}</p>
            <p><strong>Total fare:</strong> ₹{fareDetails.total}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
