// Component.jsx
import "./dashboardbottom.css";

export default function Component() {
  return (
    <div className="wellness-container">

      <div className="bg-decoration">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
        <div className="bg-circle-3"></div>
        <div className="bg-circle-4"></div>
      </div>

      <div className="content">
        <div className="header">
          <h1 className="title">
            Small Changes. Big Impact.
            <div className="title-underline" />
          </h1>
          <p className="description" style={{ marginTop: "10px", color: "goldenrod" }}>
            UmbraCare provides a simple but structured approach to track your
            cycles, pregnancy and postpartum wellness.
          </p>
        </div>
        <div className="features-grid">
          <FeatureCard title="Cycle Awareness" />
          <FeatureCard title="Pregnancy Guide" />
          <FeatureCard title="Postpartum Recovery" />
          <FeatureCard title="Data Insights" />
          <FeatureCard title="Monthly Newsletter" />
          <FeatureCard title="Love & Support" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title }) {
  return (
    <div className="feature-card">
      <h3 className="feature-title">{title}</h3>
    </div>
  );
}