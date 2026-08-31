import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AboutFounderView } from './views/AboutFounderView';
import { AboutInstitutionView } from './views/AboutInstitutionView';
import { SpeakingView } from './views/SpeakingView';
import { AcademyView } from './views/AcademyView';
import { HouseholdProfessionalsView } from './views/HouseholdProfessionalsView';
import { PrivateHouseholdsView } from './views/PrivateHouseholdsView';
import { EnterpriseView } from './views/EnterpriseView';
import { EventsGraduationView } from './views/EventsGraduationView';
import { ResourcesView } from './views/ResourcesView';
import { ContactView } from './views/ContactView';

import { CourseDetailModal } from './components/CourseDetailModal';
import { EnrolmentCheckoutModal } from './components/EnrolmentCheckoutModal';
import { SpeakingEnquiryModal } from './components/SpeakingEnquiryModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { ScrollProgressBar, ViewTransition } from './components/MotionEffects';

import { COURSES, Course } from './data/coursesData';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [enrolmentCourse, setEnrolmentCourse] = useState<Course | null>(null);
  const [speakingModalOpen, setSpeakingModalOpen] = useState<boolean>(false);
  const [speakingInitialTopic, setSpeakingInitialTopic] = useState<string | undefined>(undefined);
  const [studentPortalOpen, setStudentPortalOpen] = useState<boolean>(false);

  // Student Enrolment State (persisted locally)
  const [enrolledCourses, setEnrolledCourses] = useState<{ course: Course; studentData: any }[]>(() => {
    try {
      const saved = localStorage.getItem('flawless_student_enrolments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Default starter demo enrolment so student portal is immediately enjoyable
    return [
      {
        course: COURSES[0], // Executive Butler & Valet
        studentData: {
          fullName: 'Nomvula Dlamini',
          email: 'nomvula.d@example.co.za',
          studentId: 'FI-2026-8821',
          learningMode: 'Online Masterclass'
        }
      }
    ];
  });

  const handleEnrolSuccess = (course: Course, studentData: any) => {
    const updated = [
      ...enrolledCourses.filter(e => e.course.id !== course.id),
      { course, studentData }
    ];
    setEnrolledCourses(updated);
    try {
      localStorage.setItem('flawless_student_enrolments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenSpeaking = (topic?: string) => {
    setSpeakingInitialTopic(topic);
    setSpeakingModalOpen(true);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseDetail(course);
  };

  const handleQuickEnrol = (course: Course) => {
    setSelectedCourseDetail(null);
    setEnrolmentCourse(course);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-neutral-100 flex flex-col font-sans-body selection:bg-[#d4af37] selection:text-black">
      {/* 3D Gold Ambient Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Navigation Bar with September Physical Intake Alert */}
      <Navbar
        currentView={currentView}
        setCurrentView={handleNavigate}
        onOpenSpeakingEnquiry={() => handleOpenSpeaking()}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
      />

      {/* Main View Router with Smooth View Transitions */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <ViewTransition key="home" viewKey="home">
              <HomeView
                setCurrentView={handleNavigate}
                onSelectCourse={handleSelectCourse}
                onQuickEnrol={handleQuickEnrol}
                onOpenSpeakingEnquiry={handleOpenSpeaking}
              />
            </ViewTransition>
          )}

          {currentView === 'about-founder' && (
            <ViewTransition key="about-founder" viewKey="about-founder">
              <AboutFounderView
                setCurrentView={handleNavigate}
                onOpenSpeakingEnquiry={() => handleOpenSpeaking()}
              />
            </ViewTransition>
          )}

          {(currentView === 'about' || currentView === 'about-institution') && (
            <ViewTransition key="about-institution" viewKey="about-institution">
              <AboutInstitutionView
                setCurrentView={handleNavigate}
                onOpenSpeakingEnquiry={() => handleOpenSpeaking()}
              />
            </ViewTransition>
          )}

          {currentView === 'speaking' && (
            <ViewTransition key="speaking" viewKey="speaking">
              <SpeakingView
                onOpenSpeakingEnquiry={handleOpenSpeaking}
              />
            </ViewTransition>
          )}

          {currentView === 'academy' && (
            <ViewTransition key="academy" viewKey="academy">
              <AcademyView
                onSelectCourse={handleSelectCourse}
                onQuickEnrol={handleQuickEnrol}
              />
            </ViewTransition>
          )}

          {currentView === 'household-professionals' && (
            <ViewTransition key="household-professionals" viewKey="household-professionals">
              <HouseholdProfessionalsView
                setCurrentView={handleNavigate}
                onExploreCourses={() => handleNavigate('academy')}
              />
            </ViewTransition>
          )}

          {currentView === 'private-households' && (
            <ViewTransition key="private-households" viewKey="private-households">
              <PrivateHouseholdsView
                onOpenSpeakingEnquiry={() => handleOpenSpeaking()}
              />
            </ViewTransition>
          )}

          {currentView === 'enterprise' && (
            <ViewTransition key="enterprise" viewKey="enterprise">
              <EnterpriseView
                onOpenSpeakingEnquiry={handleOpenSpeaking}
              />
            </ViewTransition>
          )}

          {currentView === 'events' && (
            <ViewTransition key="events" viewKey="events">
              <EventsGraduationView
                setCurrentView={handleNavigate}
                onExploreCourses={() => handleNavigate('academy')}
              />
            </ViewTransition>
          )}

          {(currentView === 'resources' || currentView === 'publications') && (
            <ViewTransition key="resources" viewKey="resources">
              <ResourcesView />
            </ViewTransition>
          )}

          {(currentView === 'contact' || currentView === 'partnerships') && (
            <ViewTransition key="contact" viewKey="contact">
              <ContactView
                onOpenSpeakingEnquiry={() => handleOpenSpeaking()}
              />
            </ViewTransition>
          )}
        </AnimatePresence>
      </main>

      {/* Institutional Footer */}
      <Footer
        setCurrentView={handleNavigate}
        onOpenSpeakingEnquiry={() => handleOpenSpeaking()}
      />

      {/* MODALS */}
      {/* 1. Course Details Modal */}
      {selectedCourseDetail && (
        <CourseDetailModal
          course={selectedCourseDetail}
          onClose={() => setSelectedCourseDetail(null)}
          onEnrol={(course) => handleQuickEnrol(course)}
        />
      )}

      {/* 2. Enrolment / Checkout Modal */}
      {enrolmentCourse && (
        <EnrolmentCheckoutModal
          course={enrolmentCourse}
          onClose={() => setEnrolmentCourse(null)}
          onEnrolSuccess={handleEnrolSuccess}
          onViewInPortal={() => {
            setEnrolmentCourse(null);
            setStudentPortalOpen(true);
          }}
        />
      )}

      {/* 3. Speaking Enquiry Modal */}
      {speakingModalOpen && (
        <SpeakingEnquiryModal
          initialTopic={speakingInitialTopic}
          onClose={() => setSpeakingModalOpen(false)}
        />
      )}

      {/* 4. Student Learning & Graduation Portal Modal */}
      {studentPortalOpen && (
        <StudentPortalModal
          enrolledCourses={enrolledCourses}
          onClose={() => setStudentPortalOpen(false)}
          onExploreMore={() => {
            setStudentPortalOpen(false);
            handleNavigate('academy');
          }}
        />
      )}
    </div>
  );
}

export default App;
