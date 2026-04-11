const { useState, useEffect, useRef } = React;

        // Custom Hook for Scroll Reveal Animation
        const useIntersectionObserver = (options) => {
            const [isIntersecting, setIsIntersecting] = useState(false);
            const ref = useRef(null);

            useEffect(() => {
                const observer = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) {
                        setIsIntersecting(true);
                        observer.unobserve(entry.target);
                    }
                }, options);

                if (ref.current) observer.observe(ref.current);
                return () => observer.disconnect();
            }, [options]);

            return [ref, isIntersecting];
        };

        // Reusable Fade Wrapper
        const FadeInSection = ({ children, delay = 0 }) => {
            const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
            return (
                <div
                    ref={ref}
                    className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
                    style={{ transitionDelay: `${delay}ms` }}
                >
                    {children}
                </div>
            );
        };

        // Icons using SVG directly
        const PhoneIcon = () => <svg className="svg-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
        const MailIcon = () => <svg className="svg-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
        const MapPinIcon = () => <svg className="svg-icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
        const LinkedInIcon = () => <svg className="svg-icon" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

        const ThreeBackground = () => {
            const mountRef = useRef(null);
            useEffect(() => {
                const scene = new THREE.Scene();
                scene.fog = new THREE.FogExp2(0x000000, 0.02);
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                const currentMount = mountRef.current;
                currentMount.appendChild(renderer.domElement);

                const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
                scene.add(ambientLight);
                const pointLight1 = new THREE.PointLight(0x3b82f6, 4, 100);
                pointLight1.position.set(10, 10, 10);
                scene.add(pointLight1);
                const pointLight2 = new THREE.PointLight(0x1e40af, 4, 100);
                pointLight2.position.set(-10, -10, 10);
                scene.add(pointLight2);

                const coreGroup = new THREE.Group();
                scene.add(coreGroup);

                // 1. Core Polyhedron
                const coreGeometry = new THREE.IcosahedronGeometry(2, 0);
                const coreMaterial = new THREE.MeshStandardMaterial({
                    color: 0x1e293b, roughness: 0.1, metalness: 0.9, flatShading: true
                });
                const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
                coreGroup.add(coreMesh);

                // 2. Wireframe Shell
                const wireGeometry = new THREE.IcosahedronGeometry(2.5, 1);
                const wireMaterial = new THREE.MeshBasicMaterial({
                    color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.4
                });
                const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
                coreGroup.add(wireMesh);

                // 3. Orbiting Torus Knot (NEW ADVANCED SHAPE)
                const knotGeometry = new THREE.TorusKnotGeometry(3.5, 0.12, 128, 16);
                const knotMaterial = new THREE.MeshStandardMaterial({
                    color: 0x2563eb, roughness: 0.2, metalness: 0.8, emissive: 0x1e40af, emissiveIntensity: 0.5
                });
                const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
                coreGroup.add(knotMesh);

                // 4. Orbiting Simple Ring
                const ringGeometry = new THREE.TorusGeometry(4.5, 0.05, 16, 100);
                const ringMaterial = new THREE.MeshStandardMaterial({
                    color: 0x60a5fa, roughness: 0.2, metalness: 0.8, emissive: 0x60a5fa, emissiveIntensity: 0.4
                });
                const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
                ringMesh.rotation.x = Math.PI / 2;
                coreGroup.add(ringMesh);

                // 5. Star Particles Background (NEW)
                const starsGeometry = new THREE.BufferGeometry();
                const starsCount = 1000;
                const posArray = new Float32Array(starsCount * 3);
                for (let i = 0; i < starsCount * 3; i++) {
                    posArray[i] = (Math.random() - 0.5) * 60; // wide scatter
                }
                starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
                const starsMaterial = new THREE.PointsMaterial({
                    size: 0.05, color: 0x60a5fa, transparent: true, opacity: 0.7
                });
                const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
                scene.add(starsMesh);

                // 6. Floating geometric shards
                const shardGroup = new THREE.Group();
                scene.add(shardGroup);
                const shardGeometries = [
                    new THREE.BoxGeometry(0.3, 0.3, 0.3),
                    new THREE.TetrahedronGeometry(0.4),
                    new THREE.OctahedronGeometry(0.3)
                ];

                for (let i = 0; i < 70; i++) {
                    const randomGeo = shardGeometries[Math.floor(Math.random() * shardGeometries.length)];
                    const shardMat = new THREE.MeshStandardMaterial({
                        color: Math.random() > 0.5 ? 0x3b82f6 : 0x1e40af,
                        transparent: true, opacity: 0.8, flatShading: true
                    });
                    const shard = new THREE.Mesh(randomGeo, shardMat);
                    // Scatter widely including heavily behind
                    shard.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30 - 5);
                    shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
                    shard.userData = {
                        rotX: (Math.random() - 0.5) * 0.02, rotY: (Math.random() - 0.5) * 0.02,
                        startY: shard.position.y, phaseOffset: Math.random() * Math.PI * 2
                    };
                    shardGroup.add(shard);
                }

                camera.position.z = 12; // Pulled back slightly for a fuller view

                const updateObjectPositions = () => {
                    if (window.innerWidth > 992) {
                        // Desktop: Pushed significantly to the right side of the screen
                        coreGroup.position.set(6.5, 0, 0);
                    }
                    else {
                        // Mobile: Centered, but floating above the text
                        coreGroup.position.set(0, 4, 0);
                    }
                };
                updateObjectPositions();

                let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
                const windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;
                const clock = new THREE.Clock();

                const animate = () => {
                    requestAnimationFrame(animate);
                    const time = clock.getElapsedTime();
                    targetX = mouseX * 0.5; targetY = mouseY * 0.5;

                    coreMesh.rotation.y -= 0.005; coreMesh.rotation.x -= 0.002;
                    wireMesh.rotation.y += 0.003; wireMesh.rotation.x += 0.004;
                    // Animate the new complex Torus Knot
                    knotMesh.rotation.x += 0.006; knotMesh.rotation.y += 0.004;
                    ringMesh.rotation.z -= 0.005; ringMesh.rotation.y = Math.sin(time * 0.5) * 0.2;

                    coreGroup.position.y += Math.sin(time * 1.5) * 0.005;
                    coreGroup.rotation.y += 0.05 * (targetX - coreGroup.rotation.y);
                    coreGroup.rotation.x += 0.05 * (targetY - coreGroup.rotation.x);

                    // Gently rotate the starfield
                    starsMesh.rotation.y -= 0.0005;
                    starsMesh.rotation.x += 0.0002;

                    shardGroup.children.forEach(shard => {
                        shard.rotation.x += shard.userData.rotX;
                        shard.rotation.y += shard.userData.rotY;
                        shard.position.y = shard.userData.startY + Math.sin(time + shard.userData.phaseOffset) * 1.5;
                    });
                    shardGroup.position.x += 0.02 * (targetX * 3 - shardGroup.position.x);
                    shardGroup.position.y += 0.02 * (-targetY * 3 - shardGroup.position.y);
                    renderer.render(scene, camera);
                };
                animate();

                const handleResize = () => {
                    camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight); updateObjectPositions();
                };
                const handleMouseMove = (e) => {
                    mouseX = (e.clientX - windowHalfX) / windowHalfX; mouseY = (e.clientY - windowHalfY) / windowHalfY;
                };

                window.addEventListener('resize', handleResize); window.addEventListener('mousemove', handleMouseMove);
                return () => {
                    window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove);
                    if (currentMount) currentMount.removeChild(renderer.domElement);
                };
            }, []);

            return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', background: 'linear-gradient(135deg, #000000 30%, #002266 100%)' }} />;
        };

        const Header = () => {
            const [isNavOpen, setIsNavOpen] = useState(false);
            const [scrolled, setScrolled] = useState(false);

            useEffect(() => {
                const handleScroll = () => setScrolled(window.scrollY > 50);
                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
            }, []);

            return (
                <header className="header" style={{ padding: scrolled ? '0.5rem 0' : '1.25rem 0', boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none' }}>
                    <div className="container">
                        <div className="header-content" style={{ padding: 0 }}>
                            <div className="logo">ATK<span>R</span></div>
                            <button className="nav-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>☰</button>
                            <ul className={`nav-links ${isNavOpen ? 'show' : ''}`}>
                                {['Home', 'About', 'Skills', 'Portfolio', 'Resume', 'Contact'].map((item) => (
                                    <li key={item}><a href={`#${item.toLowerCase()}`} onClick={() => setIsNavOpen(false)}>{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </header>
            );
        };

        const Hero = () => (
            <section id="home" className="hero">
                <ThreeBackground />
                <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                    <FadeInSection delay={200}>
                        <div className="hero-content" style={{ textAlign: 'left' }}>
                            <h1>Aerula Trinath <br />Krishna Reddy</h1>
                            <p>Web Developer | App Developer | Freelancer</p>
                            <a href="#contact" className="hero-btn">Get In Touch</a>
                        </div>
                    </FadeInSection>
                </div>
            </section>
        );

        const About = () => (
            <section id="about" className="section" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <FadeInSection>
                        <div className="section-title">
                            <h2>About Me</h2>
                        </div>
                    </FadeInSection>
                    <div className="about-content">
                        <FadeInSection delay={100}>
                            <div className="about-img">
                                <img src="C:/Users/krish/OneDrive/Pictures/trinath.jpg" alt="Profile" />
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={300}>
                            <div className="about-text">
                                <h3>Architecting Digital Experiences</h3>
                                <p>Hello! I'm Aerula Trinath Krishna Reddy, a passionate web and app developer with a keen interest in creating beautiful, functional, and user-friendly digital experiences. Currently pursuing my graduation at Aurora University, I also work as a freelancer on various innovative tech projects.</p>
                                <div className="about-info">
                                    <div className="info-item"><strong>Birthday</strong> <span>March 9, 2007</span></div>
                                    <div className="info-item"><strong>Phone</strong> <span>+91 9391820871</span></div>
                                    <div className="info-item"><strong>Email</strong> <span>krishnareddy...</span></div>
                                    <div className="info-item"><strong>Location</strong> <span>Hyderabad, IN</span></div>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>
        );

        const SkillItem = ({ skill, index }) => {
            const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
            return (
                <FadeInSection delay={index * 100}>
                    <div className="skill-card" ref={ref}>
                        <div className="skill-card-header">
                            <h3>{skill.title}</h3>
                        </div>
                        <div className="skill-card-body">
                            <div className="skill-progress">
                                <div className="skill-progress-bar" style={{ width: isVisible ? skill.progress : '0%' }}></div>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.95rem' }}>{skill.desc}</p>
                        </div>
                    </div>
                </FadeInSection>
            );
        };

        const Skills = () => {
            const skillList = [
                { title: 'Web Development', progress: '85%', desc: 'Building responsive, scalable web applications with modern frameworks.' },
                { title: 'App Development', progress: '80%', desc: 'Developing immersive mobile experiences for diverse operating systems.' },
                { title: 'C Programming', progress: '75%', desc: 'Robust background in core algorithms and low-level system design.' },
                { title: 'UI/UX Design', progress: '90%', desc: 'Drafting intuitive and visually aesthetic interfaces that drive engagement.' },
                { title: 'Marketing', progress: '70%', desc: 'Digital marketing execution including SEO, branding, and social strategy.' },
                { title: 'Photoshop', progress: '75%', desc: 'Professional image manipulation, graphic asset creation and typography.' },
            ];

            return (
                <section id="skills" className="section" style={{ backgroundColor: 'var(--gray-light)' }}>
                    <div className="container">
                        <FadeInSection>
                            <div className="section-title">
                                <h2>My Expertise</h2>
                            </div>
                        </FadeInSection>
                        <div className="skills-container">
                            {skillList.map((skill, index) => <SkillItem key={index} skill={skill} index={index} />)}
                        </div>
                    </div>
                </section>
            );
        };

        const PortfolioItem = ({ project, index }) => {
            const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
            return (
                <div
                    ref={ref}
                    className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                >
                    <div className="portfolio-item">
                        <div className="portfolio-img">
                            <div className="portfolio-icon">{project.icon}</div>
                        </div>
                        <div className="portfolio-content">
                            <h4 className="portfolio-title">{project.title}</h4>
                            <div className="portfolio-tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="portfolio-tag">{tag}</span>
                                ))}
                            </div>
                            <p style={{ margin: 0, fontSize: '0.95rem' }}>{project.desc}</p>
                        </div>
                    </div>
                </div>
            );
        };

        const Portfolio = () => {
            const projects = [
                {
                    title: "Campus Swap",
                    icon: "🎓",
                    tags: ["Web App", "Marketplace"],
                    desc: "A dedicated digital marketplace engineered for university students to effortlessly exchange, purchase, and sell academic resources locally."
                },
                {
                    title: "Sales Data Aggregator",
                    icon: "📊",
                    tags: ["Data Analytics", "Dashboard"],
                    desc: "An automated data processing platform that consolidates records from diverse sales channels to visualize real-time multidimensional revenue."
                },
                {
                    title: "Student Management System",
                    icon: "🏫",
                    tags: ["Database", "Architecture"],
                    desc: "A secure, comprehensive digital ecosystem for universities to seamlessly manage student records, attendances, and automated administrative operations."
                },
                {
                    title: "Customer Support Engine",
                    icon: "🤖",
                    tags: ["AI / NLP", "Automation"],
                    desc: "An intelligent reasoning engine built to triage and resolve complex customer queries via automated contextual analysis and language processing."
                }
            ];

            return (
                <section id="portfolio" className="section" style={{ backgroundColor: '#ffffff' }}>
                    <div className="container">
                        <FadeInSection>
                            <div className="section-title">
                                <h2>Featured Projects</h2>
                            </div>
                        </FadeInSection>
                        <div className="portfolio-grid">
                            {projects.map((proj, idx) => (
                                <PortfolioItem key={idx} project={proj} index={idx} />
                            ))}
                        </div>
                    </div>
                </section>
            );
        };

        const Resume = () => {
            const [activeTab, setActiveTab] = useState('education');

            return (
                <section id="resume" className="section" style={{ backgroundColor: 'var(--gray-light)' }}>
                    <div className="container">
                        <FadeInSection>
                            <div className="section-title">
                                <h2>Career Path</h2>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={100}>
                            <div className="resume-tabs">
                                <button className={`resume-tab ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>Education</button>
                                <button className={`resume-tab ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>Experience</button>
                            </div>
                        </FadeInSection>

                        <div className="resume-content">
                            <div className={`resume-items ${activeTab === 'education' ? 'active' : ''}`}>
                                <div className="resume-item">
                                    <span className="resume-date">2022 - Present</span>
                                    <h4 className="resume-title">Graduation (Computer Science)</h4>
                                    <p className="resume-place">Aurora University, Paravathapur</p>
                                    <p style={{ margin: 0 }}>Specializing in advanced software engineering workflows and architectural design patterns.</p>
                                </div>
                                <div className="resume-item">
                                    <span className="resume-date">2020 - 2022</span>
                                    <h4 className="resume-title">Intermediate</h4>
                                    <p className="resume-place">Narayana Jr College, Habsiguda</p>
                                    <p style={{ margin: 0 }}>Built strong foundational mathematics and physics problem-solving paradigms.</p>
                                </div>
                                <div className="resume-item">
                                    <span className="resume-date">2019 - 2020</span>
                                    <h4 className="resume-title">High School</h4>
                                    <p className="resume-place">Vijaya Ratna High School, Boduppal</p>
                                </div>
                            </div>

                            <div className={`resume-items ${activeTab === 'experience' ? 'active' : ''}`}>
                                <div className="resume-item">
                                    <span className="resume-date">2022 - Present</span>
                                    <h4 className="resume-title">Freelance Web Architect</h4>
                                    <p className="resume-place">Consulting</p>
                                    <p style={{ margin: 0 }}>Designing robust business interfaces and delivering end-to-end full-stack web solutions to global clients.</p>
                                </div>
                                <div className="resume-item">
                                    <span className="resume-date">2023 - Present</span>
                                    <h4 className="resume-title">App Development</h4>
                                    <p className="resume-place">Independent Creation</p>
                                    <p style={{ margin: 0 }}>Structuring React Native applications utilizing responsive patterns and native device APIs.</p>
                                </div>
                            </div>
                        </div>

                        <FadeInSection delay={200}>
                            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                                <a href="Downloads/A_Trinath_Krishna_Resume.pdf" className="btn" style={{ width: 'auto' }} download>Download Professional PDF</a>
                            </div>
                        </FadeInSection>
                    </div>
                </section>
            );
        };

        const Contact = () => (
            <section id="contact" className="section" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <FadeInSection>
                        <div className="section-title">
                            <h2>Get In Touch</h2>
                        </div>
                    </FadeInSection>
                    <div className="contact-container">
                        <FadeInSection delay={100}>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <div className="contact-icon"><PhoneIcon /></div>
                                    <div><h4 style={{ marginBottom: '0.25rem' }}>Phone</h4><p style={{ margin: 0 }}>+91 9391820871</p></div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon"><MailIcon /></div>
                                    <div><h4 style={{ marginBottom: '0.25rem' }}>Email</h4><p style={{ margin: 0 }}>krishnareddyaerulatrinath@gmail.com</p></div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon"><MapPinIcon /></div>
                                    <div><h4 style={{ marginBottom: '0.25rem' }}>Location</h4><p style={{ margin: 0 }}>Sri puri Colony, Peerzadiguda, Uppal</p></div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon"><LinkedInIcon /></div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>LinkedIn</h4>
                                        <p style={{ margin: 0 }}><a href="https://www.linkedin.com/in/aerula-trinath-krishna-reddy" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Connect With Me</a></p>
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={300}>
                            <div className="contact-form">
                                <h3 style={{ marginBottom: '2rem' }}>Send a Message</h3>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group"><input type="text" className="form-control" placeholder="Full Name" required /></div>
                                    <div className="form-group"><input type="email" className="form-control" placeholder="Email Address" required /></div>
                                    <div className="form-group"><textarea className="form-control" placeholder="How can I help you?" required></textarea></div>
                                    <button type="submit" className="btn">Send Payload</button>
                                </form>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>
        );

        const Footer = () => (
            <footer className="footer">
                <div className="container">
                    <div className="logo" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.5)' }}>ATK<span>R</span></div>
                    <p>© 2024 Aerula Trinath Krishna Reddy. All rights reserved.</p>
                </div>
            </footer>
        );

        const App = () => (
            <React.Fragment>
                <Header />
                <Hero />
                <About />
                <Skills />
                <Portfolio />
                <Resume />
                <Contact />
                <Footer />
            </React.Fragment>
        );

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);