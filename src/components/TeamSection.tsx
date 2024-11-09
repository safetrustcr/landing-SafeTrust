import React from "react";

interface TeamMember {
  name: string;
  role: string;
  role2: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Josué Brenes",
      role: "",
      role2: "Frontend Developer",
    },
    {
      name: "Randall Valenciano",
      role: "",
      role2: "Fullstack Developer",
    },
    {
      name: "Diego Duarte",
      role: "",
      role2: "Fullstack Developer",
    },
    {
      name: "Anwar Sanchez",
      role: "",
      role2: "Fullstack Developer",
    },
    {
      name: "Josué Soto",
      role: "",
      role2: "Backend Developer",
    },
    {
      name: "Diego Barquero",
      role: "",
      role2: "Fullstack Developer",
    },
  ];

  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="relative max-w-7xl mx-auto text-center px-8 text-black">
        <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
        <p className="text-lg mb-12">
          Our talented team is committed to building reliable and innovative
          solutions for your organization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col justify-center h-48 w-60 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 bg-[#344153] mx-auto p-6"
            >
              <h3 className="text-xl font-bold mb-1 text-white">
                {member.name.toUpperCase()}
              </h3>
              <p className="text-sm mb-1 text-white">{member.role}</p>
              <p className="text-sm text-white">{member.role2}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
