import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Chapter = () => {
  const { examType } = useParams();
  const navigate = useNavigate();

const allChapters = {
  jee: [
    // Physics Chapters (Commonly covered in JEE)
    { id: 1, name: "Physics: Units and Dimensions", file: "/notes/jee/physics_units_dimensions.pdf" },
    { id: 2, name: "Physics: Kinematics", file: "/notes/jee/physics_kinematics.pdf" },
    { id: 3, name: "Physics: Laws of Motion", file: "/notes/jee/physics_laws_of_motion.pdf" },
    { id: 4, name: "Physics: Work, Energy and Power", file: "/notes/jee/physics_work_energy_power.pdf" },
    { id: 5, name: "Physics: Rotational Motion", file: "/notes/jee/physics_rotational_motion.pdf" },
    { id: 6, name: "Physics: Gravitation", file: "/notes/jee/physics_gravitation.pdf" },
    { id: 7, name: "Physics: Properties of Solids and Liquids", file: "/notes/jee/physics_solids_liquids.pdf" },
    { id: 8, name: "Physics: Thermodynamics", file: "/notes/jee/physics_thermodynamics.pdf" },
    { id: 9, name: "Physics: Kinetic Theory of Gases", file: "/notes/jee/physics_kinetic_theory.pdf" },
    { id: 10, name: "Physics: Oscillations and Waves", file: "/notes/jee/physics_oscillations_waves.pdf" },
    { id: 11, name: "Physics: Electrostatics", file: "/notes/jee/physics_electrostatics.pdf" },
    { id: 12, name: "Physics: Current Electricity", file: "/notes/jee/physics_current_electricity.pdf" },
    { id: 13, name: "Physics: Magnetic Effects of Current and Magnetism", file: "/notes/jee/physics_magnetic_effects.pdf" },
    { id: 14, name: "Physics: Electromagnetic Induction and Alternating Currents", file: "/notes/jee/physics_emi_ac.pdf" },
    { id: 15, name: "Physics: Electromagnetic Waves", file: "/notes/jee/physics_electromagnetic_waves.pdf" },
    { id: 16, name: "Physics: Optics (Ray and Wave Optics)", file: "/notes/jee/physics_optics.pdf" },
    { id: 17, name: "Physics: Dual Nature of Matter and Radiation", file: "/notes/jee/physics_dual_nature.pdf" },
    { id: 18, name: "Physics: Atoms and Nuclei", file: "/notes/jee/physics_atoms_nuclei.pdf" },
    { id: 19, name: "Physics: Electronic Devices", file: "/notes/jee/physics_electronic_devices.pdf" },
    { id: 20, name: "Physics: Communication Systems", file: "/notes/jee/physics_communication_systems.pdf" },

    { id: 51, name: "Chemistry: Some Basic Concepts of Chemistry (Mole Concept)", file: "/notes/jee/chemistry_mole_concept.pdf" },
    { id: 52, name: "Chemistry: Structure of Atom", file: "/notes/jee/chemistry_atomic_structure.pdf" },
    { id: 53, name: "Chemistry: Classification of Elements and Periodicity", file: "/notes/jee/chemistry_periodicity.pdf" },
    { id: 54, name: "Chemistry: Chemical Bonding and Molecular Structure", file: "/notes/jee/chemistry_chemical_bonding.pdf" },
    { id: 55, name: "Chemistry: States of Matter", file: "/notes/jee/chemistry_states_of_matter.pdf" },
    { id: 56, name: "Chemistry: Thermodynamics", file: "/notes/jee/chemistry_thermodynamics.pdf" },
    { id: 57, name: "Chemistry: Equilibrium", file: "/notes/jee/chemistry_equilibrium.pdf" },
    { id: 58, name: "Chemistry: Redox Reactions", file: "/notes/jee/chemistry_redox.pdf" },
    { id: 59, name: "Chemistry: Hydrogen", file: "/notes/jee/chemistry_hydrogen.pdf" },
    { id: 60, name: "Chemistry: S-Block Elements", file: "/notes/jee/chemistry_s_block.pdf" },
    { id: 61, name: "Chemistry: P-Block Elements (Groups 13 & 14)", file: "/notes/jee/chemistry_p_block_13_14.pdf" },
    { id: 62, name: "Chemistry: Organic Chemistry - Some Basic Principles & Techniques", file: "/notes/jee/chemistry_organic_basics.pdf" },
    { id: 63, name: "Chemistry: Hydrocarbons", file: "/notes/jee/chemistry_hydrocarbons.pdf" },
    { id: 64, name: "Chemistry: Environmental Chemistry", file: "/notes/jee/chemistry_environmental.pdf" },
    { id: 65, name: "Chemistry: Solid State", file: "/notes/jee/chemistry_solid_state.pdf" },
    { id: 66, name: "Chemistry: Solutions", file: "/notes/jee/chemistry_solutions.pdf" },
    { id: 67, name: "Chemistry: Electrochemistry", file: "/notes/jee/chemistry_electrochemistry.pdf" },
    { id: 68, name: "Chemistry: Chemical Kinetics", file: "/notes/jee/chemistry_chemical_kinetics.pdf" },
    { id: 69, name: "Chemistry: Surface Chemistry", file: "/notes/jee/chemistry_surface_chemistry.pdf" },
    { id: 70, name: "Chemistry: General Principles and Processes of Isolation of Elements", file: "/notes/jee/chemistry_metallurgy.pdf" },
    { id: 71, name: "Chemistry: P-Block Elements (Groups 15 to 18)", file: "/notes/jee/chemistry_p_block_15_18.pdf" },
    { id: 72, name: "Chemistry: D & F-Block Elements", file: "/notes/jee/chemistry_d_f_block.pdf" },
    { id: 73, name: "Chemistry: Coordination Compounds", file: "/notes/jee/chemistry_coordination_compounds.pdf" },
    { id: 74, name: "Chemistry: Haloalkanes and Haloarenes", file: "/notes/jee/chemistry_haloalkanes.pdf" },
    { id: 75, name: "Chemistry: Alcohols, Phenols and Ethers", file: "/notes/jee/chemistry_alcohols_phenols_ethers.pdf" },
    { id: 76, name: "Chemistry: Aldehydes, Ketones and Carboxylic Acids", file: "/notes/jee/chemistry_aldehydes_ketones_acids.pdf" },
    { id: 77, name: "Chemistry: Amines", file: "/notes/jee/chemistry_amines.pdf" },
    { id: 78, name: "Chemistry: Biomolecules", file: "/notes/jee/chemistry_biomolecules.pdf" },
    { id: 79, name: "Chemistry: Polymers", file: "/notes/jee/chemistry_polymers.pdf" },
    { id: 80, name: "Chemistry: Chemistry in Everyday Life", file: "/notes/jee/chemistry_everyday_life.pdf" },

    // Maths Chapters (Commonly covered in JEE)
    { id: 101, name: "Maths: Sets, Relations and Functions", file: "/notes/jee/maths_sets_relations_functions.pdf" },
    { id: 102, name: "Maths: Complex Numbers and Quadratic Equations", file: "/notes/jee/maths_complex_quadratic.pdf" },
    { id: 103, name: "Maths: Matrices and Determinants", file: "/notes/jee/maths_matrices_determinants.pdf" },
    { id: 104, name: "Maths: Permutations and Combinations", file: "/notes/jee/maths_permutations_combinations.pdf" },
    { id: 105, name: "Maths: Mathematical Induction", file: "/notes/jee/maths_mathematical_induction.pdf" },
    { id: 106, name: "Maths: Binomial Theorem and its Simple Applications", file: "/notes/jee/maths_binomial_theorem.pdf" },
    { id: 107, name: "Maths: Sequences and Series", file: "/notes/jee/maths_sequences_series.pdf" },
    { id: 108, name: "Maths: Limit, Continuity and Differentiability", file: "/notes/jee/maths_limit_continuity_differentiability.pdf" },
    { id: 109, name: "Maths: Integral Calculus", file: "/notes/jee/maths_integral_calculus.pdf" },
    { id: 110, name: "Maths: Differential Equations", file: "/notes/jee/maths_differential_equations.pdf" },
    { id: 111, name: "Maths: Co-ordinate Geometry", file: "/notes/jee/maths_coordinate_geometry.pdf" },
    { id: 112, name: "Maths: Three Dimensional Geometry", file: "/notes/jee/maths_3d_geometry.pdf" },
    { id: 113, name: "Maths: Vector Algebra", file: "/notes/jee/maths_vector_algebra.pdf" },
    { id: 114, name: "Maths: Statistics and Probability", file: "/notes/jee/maths_statistics_probability.pdf" },
    { id: 115, name: "Maths: Trigonometry", file: "/notes/jee/maths_trigonometry.pdf" },
    { id: 116, name: "Maths: Mathematical Reasoning", file: "/notes/jee/maths_mathematical_reasoning.pdf" },
  ],
  neet: [
    // Physics Chapters (Commonly covered in NEET)
    { id: 201, name: "Physics: Physical World and Measurement", file: "/notes/neet/physics_physical_world.pdf" },
    { id: 202, name: "Physics: Kinematics", file: "/notes/neet/physics_kinematics.pdf" },
    { id: 203, name: "Physics: Laws of Motion", file: "/notes/neet/physics_laws_of_motion.pdf" },
    { id: 204, name: "Physics: Work, Energy and Power", file: "/notes/neet/physics_work_energy_power.pdf" },
    { id: 205, name: "Physics: Motion of System of Particles & Rigid Body", file: "/notes/neet/physics_rigid_body_motion.pdf" },
    { id: 206, name: "Physics: Gravitation", file: "/notes/neet/physics_gravitation.pdf" },
    { id: 207, name: "Physics: Properties of Bulk Matter", file: "/notes/neet/physics_bulk_matter.pdf" },
    { id: 208, name: "Physics: Thermodynamics", file: "/notes/neet/physics_thermodynamics.pdf" },
    { id: 209, name: "Physics: Behaviour of Perfect Gas and Kinetic Theory", file: "/notes/neet/physics_perfect_gas.pdf" },
    { id: 210, name: "Physics: Oscillations and Waves", file: "/notes/neet/physics_oscillations_waves.pdf" },
    { id: 211, name: "Physics: Electrostatics", file: "/notes/neet/physics_electrostatics.pdf" },
    { id: 212, name: "Physics: Current Electricity", file: "/notes/neet/physics_current_electricity.pdf" },
    { id: 213, name: "Physics: Magnetic Effects of Current & Magnetism", file: "/notes/neet/physics_magnetic_effects.pdf" },
    { id: 214, name: "Physics: Electromagnetic Induction & Alternating Currents", file: "/notes/neet/physics_emi_ac.pdf" },
    { id: 215, name: "Physics: Electromagnetic Waves", file: "/notes/neet/physics_electromagnetic_waves.pdf" },
    { id: 216, name: "Physics: Optics (Ray & Wave Optics)", file: "/notes/neet/physics_optics.pdf" },
    { id: 217, name: "Physics: Dual Nature of Matter and Radiation", file: "/notes/neet/physics_dual_nature.pdf" },
    { id: 218, name: "Physics: Atoms and Nuclei", file: "/notes/neet/physics_atoms_nuclei.pdf" },
    { id: 219, name: "Physics: Electronic Devices", file: "/notes/neet/physics_electronic_devices.pdf" },

    // Chemistry Chapters (Commonly covered in NEET)
    { id: 251, name: "Chemistry: Some Basic Concepts of Chemistry", file: "/notes/neet/chemistry_basic_concepts.pdf" },
    { id: 252, name: "Chemistry: Structure of Atom", file: "/notes/neet/chemistry_atomic_structure.pdf" },
    { id: 253, name: "Chemistry: Classification of Elements and Periodicity", file: "/notes/neet/chemistry_periodicity.pdf" },
    { id: 254, name: "Chemistry: Chemical Bonding and Molecular Structure", file: "/notes/neet/chemistry_chemical_bonding.pdf" },
    { id: 255, name: "Chemistry: States of Matter", file: "/notes/neet/chemistry_states_of_matter.pdf" },
    { id: 256, name: "Chemistry: Thermodynamics", file: "/notes/neet/chemistry_thermodynamics.pdf" },
    { id: 257, name: "Chemistry: Equilibrium", file: "/notes/neet/chemistry_equilibrium.pdf" },
    { id: 258, name: "Chemistry: Redox Reactions", file: "/notes/neet/chemistry_redox.pdf" },
    { id: 259, name: "Chemistry: Hydrogen", file: "/notes/neet/chemistry_hydrogen.pdf" },
    { id: 260, name: "Chemistry: S-Block Elements", file: "/notes/neet/chemistry_s_block.pdf" },
    { id: 261, name: "Chemistry: P-Block Elements (Groups 13 & 14)", file: "/notes/neet/chemistry_p_block_13_14.pdf" },
    { id: 262, name: "Chemistry: Organic Chemistry - Some Basic Principles & Techniques", file: "/notes/neet/chemistry_organic_basics.pdf" },
    { id: 263, name: "Chemistry: Hydrocarbons", file: "/notes/neet/chemistry_hydrocarbons.pdf" },
    { id: 264, name: "Chemistry: Environmental Chemistry", file: "/notes/neet/chemistry_environmental.pdf" },
    { id: 265, name: "Chemistry: Solid State", file: "/notes/neet/chemistry_solid_state.pdf" },
    { id: 266, name: "Chemistry: Solutions", file: "/notes/neet/chemistry_solutions.pdf" },
    { id: 267, name: "Chemistry: Electrochemistry", file: "/notes/neet/chemistry_electrochemistry.pdf" },
    { id: 268, name: "Chemistry: Chemical Kinetics", file: "/notes/neet/chemistry_chemical_kinetics.pdf" },
    { id: 269, name: "Chemistry: Surface Chemistry", file: "/notes/neet/chemistry_surface_chemistry.pdf" },
    { id: 270, name: "Chemistry: General Principles & Processes of Isolation of Elements", file: "/notes/neet/chemistry_metallurgy.pdf" },
    { id: 271, name: "Chemistry: P-Block Elements (Groups 15 to 18)", file: "/notes/neet/chemistry_p_block_15_18.pdf" },
    { id: 272, name: "Chemistry: D & F-Block Elements", file: "/notes/neet/chemistry_d_f_block.pdf" },
    { id: 273, name: "Chemistry: Coordination Compounds", file: "/notes/neet/chemistry_coordination_compounds.pdf" },
    { id: 274, name: "Chemistry: Haloalkanes and Haloarenes", file: "/notes/neet/chemistry_haloalkanes.pdf" },
    { id: 275, name: "Chemistry: Alcohols, Phenols and Ethers", file: "/notes/neet/chemistry_alcohols_phenols_ethers.pdf" },
    { id: 276, name: "Chemistry: Aldehydes, Ketones and Carboxylic Acids", file: "/notes/neet/chemistry_aldehydes_ketones_acids.pdf" },
    { id: 277, name: "Chemistry: Amines", file: "/notes/neet/chemistry_amines.pdf" },
    { id: 278, name: "Chemistry: Biomolecules", file: "/notes/neet/chemistry_biomolecules.pdf" },
    { id: 279, name: "Chemistry: Polymers", file: "/notes/neet/chemistry_polymers.pdf" },
    { id: 280, name: "Chemistry: Chemistry in Everyday Life", file: "/notes/neet/chemistry_everyday_life.pdf" },

    // Biology Chapters (Commonly covered in NEET)
    { id: 301, name: "Biology: The Living World", file: "/notes/neet/biology_living_world.pdf" },
    { id: 302, name: "Biology: Biological Classification", file: "/notes/neet/biology_biological_classification.pdf" },
    { id: 303, name: "Biology: Plant Kingdom", file: "/notes/neet/biology_plant_kingdom.pdf" },
    { id: 304, name: "Biology: Animal Kingdom", file: "/notes/neet/biology_animal_kingdom.pdf" },
    { id: 305, name: "Biology: Morphology of Flowering Plants", file: "/notes/neet/biology_morphology_flowering_plants.pdf" },
    { id: 306, name: "Biology: Anatomy of Flowering Plants", file: "/notes/neet/biology_anatomy_flowering_plants.pdf" },
    { id: 307, name: "Biology: Structural Organisation in Animals", file: "/notes/neet/biology_structural_organisation_animals.pdf" },
    { id: 308, name: "Biology: Cell - The Unit of Life", file: "/notes/neet/biology_cell_unit_of_life.pdf" },
    { id: 309, name: "Biology: Biomolecules", file: "/notes/neet/biology_biomolecules.pdf" },
    { id: 310, name: "Biology: Cell Cycle and Cell Division", file: "/notes/neet/biology_cell_cycle_division.pdf" },
    { id: 311, name: "Biology: Transport in Plants", file: "/notes/neet/biology_transport_in_plants.pdf" },
    { id: 312, name: "Biology: Mineral Nutrition", file: "/notes/neet/biology_mineral_nutrition.pdf" },
    { id: 313, name: "Biology: Photosynthesis in Higher Plants", file: "/notes/neet/biology_photosynthesis.pdf" },
    { id: 314, name: "Biology: Respiration in Plants", file: "/notes/neet/biology_respiration_in_plants.pdf" },
    { id: 315, name: "Biology: Plant Growth and Development", file: "/notes/neet/biology_plant_growth_development.pdf" },
    { id: 316, name: "Biology: Digestion and Absorption", file: "/notes/neet/biology_digestion_absorption.pdf" },
    { id: 317, name: "Biology: Breathing and Exchange of Gases", file: "/notes/neet/biology_breathing_exchange_gases.pdf" },
    { id: 318, name: "Biology: Body Fluids and Circulation", file: "/notes/neet/biology_body_fluids_circulation.pdf" },
    { id: 319, name: "Biology: Excretory Products and their Elimination", file: "/notes/neet/biology_excretory_products.pdf" },
    { id: 320, name: "Biology: Locomotion and Movement", file: "/notes/neet/biology_locomotion_movement.pdf" },
    { id: 321, name: "Biology: Neural Control and Coordination", file: "/notes/neet/biology_neural_control.pdf" },
    { id: 322, name: "Biology: Chemical Coordination and Integration", file: "/notes/neet/biology_chemical_coordination.pdf" },
    { id: 323, name: "Biology: Reproduction in Organisms", file: "/notes/neet/biology_reproduction_organisms.pdf" },
    { id: 324, name: "Biology: Sexual Reproduction in Flowering Plants", file: "/notes/neet/biology_sexual_reproduction_flowering_plants.pdf" },
    { id: 325, name: "Biology: Human Reproduction", file: "/notes/neet/biology_human_reproduction.pdf" },
    { id: 326, name: "Biology: Reproductive Health", file: "/notes/neet/biology_reproductive_health.pdf" },
    { id: 327, name: "Biology: Principles of Inheritance and Variation", file: "/notes/neet/biology_inheritance_variation.pdf" },
    { id: 328, name: "Biology: Molecular Basis of Inheritance", file: "/notes/neet/biology_molecular_basis_inheritance.pdf" },
    { id: 329, name: "Biology: Evolution", file: "/notes/neet/biology_evolution.pdf" },
    { id: 330, name: "Biology: Human Health and Disease", file: "/notes/neet/biology_human_health_disease.pdf" },
    { id: 331, name: "Biology: Strategies for Enhancement in Food Production", file: "/notes/neet/biology_food_production_strategies.pdf" },
    { id: 332, name: "Biology: Microbes in Human Welfare", file: "/notes/neet/biology_microbes_human_welfare.pdf" },
    { id: 333, name: "Biology: Biotechnology - Principles and Processes", file: "/notes/neet/biology_biotechnology_principles.pdf" },
    { id: 334, name: "Biology: Biotechnology and its Applications", file: "/notes/neet/biology_biotechnology_applications.pdf" },
    { id: 335, name: "Biology: Organisms and Populations", file: "/notes/neet/biology_organisms_populations.pdf" },
    { id: 336, name: "Biology: Ecosystem", file: "/notes/neet/biology_ecosystem.pdf" },
    { id: 337, name: "Biology: Biodiversity and Conservation", file: "/notes/neet/biology_biodiversity_conservation.pdf" },
    { id: 338, name: "Biology: Environmental Issues", file: "/notes/neet/biology_environmental_issues.pdf" },
  ],
  ncert: [
    // Class 6 NCERT (Example)
    { id: 401, name: "Class 6: Science - Food: Where Does It Come From?", file: "/notes/ncert/class6_science_food_where_from.pdf" },
    { id: 402, name: "Class 6: Science - Components of Food", file: "/notes/ncert/class6_science_components_of_food.pdf" },
    { id: 403, name: "Class 6: Science - Fibre to Fabric", file: "/notes/ncert/class6_science_fibre_to_fabric.pdf" },
    { id: 404, name: "Class 6: Science - Sorting Materials into Groups", file: "/notes/ncert/class6_science_sorting_materials.pdf" },
    { id: 405, name: "Class 6: Science - Separation of Substances", file: "/notes/ncert/class6_science_separation_substances.pdf" },
    { id: 406, name: "Class 6: Maths - Knowing Our Numbers", file: "/notes/ncert/class6_maths_knowing_numbers.pdf" },
    { id: 407, name: "Class 6: Maths - Whole Numbers", file: "/notes/ncert/class6_maths_whole_numbers.pdf" },
    { id: 408, name: "Class 6: Maths - Playing With Numbers", file: "/notes/ncert/class6_maths_playing_with_numbers.pdf" },
    { id: 409, name: "Class 6: History - What, Where, How and When?", file: "/notes/ncert/class6_history_what_where_how_when.pdf" },
    { id: 410, name: "Class 6: Geography - The Earth In The Solar System", file: "/notes/ncert/class6_geo_earth_solar_system.pdf" },

    // Class 9 NCERT (Example)
    { id: 501, name: "Class 9: Science - Matter in Our Surroundings", file: "/notes/ncert/class9_science_matter_surroundings.pdf" },
    { id: 502, name: "Class 9: Science - Is Matter Around Us Pure?", file: "/notes/ncert/class9_science_matter_pure.pdf" },
    { id: 503, name: "Class 9: Science - Atoms and Molecules", file: "/notes/ncert/class9_science_atoms_molecules.pdf" },
    { id: 504, name: "Class 9: Science - Structure of the Atom", file: "/notes/ncert/class9_science_structure_atom.pdf" },
    { id: 505, name: "Class 9: Science - The Fundamental Unit of Life", file: "/notes/ncert/class9_science_fundamental_unit_life.pdf" },
    { id: 506, name: "Class 9: Maths - Number Systems", file: "/notes/ncert/class9_maths_number_systems.pdf" },
    { id: 507, name: "Class 9: Maths - Polynomials", file: "/notes/ncert/class9_maths_polynomials.pdf" },
    { id: 508, name: "Class 9: Maths - Linear Equations in Two Variables", file: "/notes/ncert/class9_maths_linear_equations.pdf" },
    { id: 509, name: "Class 9: History - The French Revolution", file: "/notes/ncert/class9_history_french_revolution.pdf" },
    { id: 510, name: "Class 9: Geography - India - Size and Location", file: "/notes/ncert/class9_geo_india_size_location.pdf" },

    // Class 11 NCERT (Example - targeting Science stream)
    { id: 601, name: "Class 11: Physics - Physical World", file: "/notes/ncert/class11_physics_physical_world.pdf" },
    { id: 602, name: "Class 11: Physics - Units and Measurements", file: "/notes/ncert/class11_physics_units_measurements.pdf" },
    { id: 603, name: "Class 11: Physics - Motion in a Straight Line", file: "/notes/ncert/class11_physics_motion_straight_line.pdf" },
    { id: 604, name: "Class 11: Chemistry - Some Basic Concepts of Chemistry", file: "/notes/ncert/class11_chemistry_basic_concepts.pdf" },
    { id: 605, name: "Class 11: Chemistry - Structure of Atom", file: "/notes/ncert/class11_chemistry_structure_atom.pdf" },
    { id: 606, name: "Class 11: Biology - The Living World", file: "/notes/ncert/class11_biology_living_world.pdf" },
    { id: 607, name: "Class 11: Biology - Biological Classification", file: "/notes/ncert/class11_biology_biological_classification.pdf" },
    { id: 608, name: "Class 11: Maths - Sets", file: "/notes/ncert/class11_maths_sets.pdf" },
    { id: 609, name: "Class 11: Maths - Relations and Functions", file: "/notes/ncert/class11_maths_relations_functions.pdf" },
    { id: 610, name: "Class 11: Economics - Indian Economic Development", file: "/notes/ncert/class11_economics_indian_econ_dev.pdf" },

    // Class 12 NCERT (Example - targeting Science stream)
    { id: 701, name: "Class 12: Physics - Electric Charges and Fields", file: "/notes/ncert/class12_physics_electric_charges_fields.pdf" },
    { id: 702, name: "Class 12: Physics - Electrostatic Potential and Capacitance", file: "/notes/ncert/class12_physics_electrostatic_potential.pdf" },
    { id: 703, name: "Class 12: Chemistry - The Solid State", file: "/notes/ncert/class12_chemistry_solid_state.pdf" },
    { id: 704, name: "Class 12: Chemistry - Solutions", file: "/notes/ncert/class12_chemistry_solutions.pdf" },
    { id: 705, name: "Class 12: Biology - Reproduction in Organisms", file: "/notes/ncert/class12_biology_reproduction_organisms.pdf" },
    { id: 706, name: "Class 12: Biology - Sexual Reproduction in Flowering Plants", file: "/notes/ncert/class12_biology_sexual_reproduction_flowering_plants.pdf" },
    { id: 707, name: "Class 12: Maths - Relations and Functions", file: "/notes/ncert/class12_maths_relations_functions.pdf" },
    { id: 708, name: "Class 12: Maths - Inverse Trigonometric Functions", file: "/notes/ncert/class12_maths_inverse_trigonometric.pdf" },
    { id: 709, name: "Class 12: Economics - Macroeconomics: Introduction", file: "/notes/ncert/class12_economics_macro_introduction.pdf" },
  ],
};

  const chaptersForExam = allChapters[examType?.toLowerCase()] || [];

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileUrl.substring(fileUrl.lastIndexOf("/") + 1));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-base-content">
          {examType?.toUpperCase()} Notes - Chapters
        </h1>

        {chaptersForExam.length === 0 ? (
          <div className="text-center space-y-4">
            <p className="text-base-content/70">
              No chapters found for {examType?.toUpperCase()}.
            </p>
            <button
              onClick={() => navigate("/notes")}
              className="btn btn-primary"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {chaptersForExam.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => handleDownload(chapter.file)}
                className="card cursor-pointer hover:shadow-xl transition-shadow duration-200 bg-base-100"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-base-content">{chapter.name}</h2>
                  <p className="text-base-content/60">Click to Download</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chapter;
