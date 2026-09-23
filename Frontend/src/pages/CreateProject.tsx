import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("");
  const [requirements, setRequirements] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const project = {
      name: projectName,
      location,
      propertyType,
      projectType,
      budget,
      style,
      requirements,
      status: "NEW PROJECT",
      progress: 0,
      createdAt: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "projectCreated",
      JSON.stringify(project)
    );

    setSubmitted(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 600);
  };

  return (
    <main className="create-project-page">

      {/* HERO */}
      <section className="create-project-hero">

        <p className="section-label">
          START YOUR PROJECT
        </p>

        <h1>
          Tell us about
          <br />
          your space.
        </h1>

        <p>
          Share a few details about your home and what you want to create.
          <br />
          We'll use this to help you find the right designer.
        </p>

      </section>


      {/* FORM */}
      <section className="project-form-section">

        <form
          className="project-form"
          onSubmit={handleSubmit}
        >

          {/* PROJECT DETAILS */}
          <div className="form-section">

            <p className="form-number">
              01
            </p>

            <div className="form-content">

              <h2>
                Project details
              </h2>

              <div className="form-grid">

                <div className="form-field">

                  <label>
                    Project Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. My New Home"
                    value={projectName}
                    onChange={(e) =>
                      setProjectName(e.target.value)
                    }
                    required
                  />

                </div>


                <div className="form-field">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    placeholder="City"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    required
                  />

                </div>


                <div className="form-field">

                  <label>
                    Property Type
                  </label>

                  <select
                    value={propertyType}
                    onChange={(e) =>
                      setPropertyType(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select property type
                    </option>

                    <option>
                      Apartment
                    </option>

                    <option>
                      Villa
                    </option>

                    <option>
                      Independent House
                    </option>

                    <option>
                      Office
                    </option>

                  </select>

                </div>


                <div className="form-field">

                  <label>
                    Project Type
                  </label>

                  <select
                    value={projectType}
                    onChange={(e) =>
                      setProjectType(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select project type
                    </option>

                    <option>
                      Full Home Design
                    </option>

                    <option>
                      Living Room
                    </option>

                    <option>
                      Bedroom
                    </option>

                    <option>
                      Kitchen
                    </option>

                    <option>
                      Renovation
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </div>


          {/* PREFERENCES */}
          <div className="form-section">

            <p className="form-number">
              02
            </p>

            <div className="form-content">

              <h2>
                Your preferences
              </h2>

              <div className="form-grid">

                <div className="form-field">

                  <label>
                    Budget
                  </label>

                  <select
                    value={budget}
                    onChange={(e) =>
                      setBudget(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select your budget
                    </option>

                    <option>
                      ₹25,000 – ₹50,000
                    </option>

                    <option>
                      ₹50,000 – ₹1,00,000
                    </option>

                    <option>
                      ₹1,00,000 – ₹3,00,000
                    </option>

                    <option>
                      ₹3,00,000+
                    </option>

                  </select>

                </div>


                <div className="form-field">

                  <label>
                    Preferred Style
                  </label>

                  <select
                    value={style}
                    onChange={(e) =>
                      setStyle(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select style
                    </option>

                    <option>
                      Modern
                    </option>

                    <option>
                      Minimal
                    </option>

                    <option>
                      Contemporary
                    </option>

                    <option>
                      Luxury
                    </option>

                    <option>
                      Traditional
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </div>


          {/* REQUIREMENTS */}
          <div className="form-section">

            <p className="form-number">
              03
            </p>

            <div className="form-content">

              <h2>
                Tell us more
              </h2>

              <div className="form-field">

                <label>
                  Project Requirements
                </label>

                <textarea
                  placeholder="Tell us about your space, requirements, ideas, or anything else you'd like your designer to know..."
                  rows={7}
                  value={requirements}
                  onChange={(e) =>
                    setRequirements(e.target.value)
                  }
                  required
                />

              </div>

            </div>

          </div>


          {/* SUBMIT */}
          <div className="form-submit">

            <button
              type="submit"
              className="primary-btn"
            >
              Create Project →
            </button>

            {submitted && (
              <p className="success-message">
                Project created successfully.
              </p>
            )}

          </div>

        </form>

      </section>

    </main>
  );
}

export default CreateProject;