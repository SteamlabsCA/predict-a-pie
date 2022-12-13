import React from "react";
import "./Article.scss";
import ArticleBottomNav from "./ArticleBottomNav";

const ArticleClassroom = ({ appData }) => {
  return (
    <div className="Article">
      <div className="Article-Nav"></div>

      <div className="Article-Main">
        <div className="heading">
          <h1>
            Neural Networks for Your Non-Computer Science Classroom Subject
          </h1>
        </div>

        <div>
          <h4 style={{ paddingTop: "0", marginTop: "0" }}>
            Why AI Belongs in All Types of Curricula
          </h4>
          <p>
            The idea of Artificial Intelligence (AI) often conjures up ideas
            related to science fiction or of an individual mashing the keyboard,
            working on some complex algorithm. But regardless, we typically have
            strong preconceived notions of how we view it, especially in
            relation to education curriculums. However, we hope to challenge
            some of these notions and highlight potential areas in which AI
            could be adopted into different areas of an education curriculum.
          </p>

          <p>
            For our purposes, we borrow Mozilla’s definition of AI that
            “includes everything from algorithms and automation to complex,
            responsive machine learning systems and the social actors involved
            in maintaining those systems.” Our Educational Toolkit encompasses
            all aspects of curricula, to make students feel welcome in the AI
            space. The following list breaks down different subject areas and
            where/how AI could intersect with them.
          </p>

          <ul>
            <li>
              Computer Science/Technology – This seems like the most obvious
              area in which students learn how to construct AI by writing code.
              While this subject area also investigates the “why” of using AI,
              computer science tends to explore the “how” of creating AI more
              than other subject areas.
            </li>
            <li>
              Math – Similar to computer science, math plays an integral role in
              computer science as well as in the construction of AI. More
              specifically, mathematics such as algebra, calculus and
              probability are core to machine learning, which forms the
              foundation through which artificial intelligence functions.
            </li>
            <li>
              History/Social Studies/Governance – AI can be incorporated within
              social studies by analyzing how it is used and how it impacts
              various social structures. For instance, teachers could examine AI
              through social media and how that affects ideologies, public
              policies, or public perceptions to name a few.
            </li>
            <li>
              Economics – Similar to social studies, economics could investigate
              how AI is created and implemented in ways that shape our practice
              of economics. This could include looking at how AI is being used
              to rank job applications, make loan decisions, determine who
              qualifies for health insurance, among other economic topics.
            </li>
            <li>
              English/Foreign Languages – AI is being used to help individuals
              write in their own language (e.g., Grammarly) as well as learn
              and/or communicate in other languages too (e.g., Google Translate,
              Duolingo). Additionally, AI has been used to help research
              different types of literature, searching for common themes within
              works, examining language for common patterns or structures, or
              compiling literature reviews.
            </li>
            <li>
              Creative Writing – Just as AI is being used to research writing,
              it has also been taught to produce its own writing based on
              machine learning of other creative works. In addition to the
              coding of AI, programmers who work on these types of projects
              often incorporate aspects of creative writing to guide elements of
              AI, such as in the construction of AI powered assistants.
            </li>
            <li>
              Arts – AI is also being created to create art ranging from musical
              compositions to visual designs. Likewise, the underlying nature of
              AI has been used to further explore concepts behind musical theory
              and artistic analysis and techniques in the classroom.
            </li>
          </ul>

          <p>
            While these descriptions are merely scratching the surface of AI and
            how it intersects with different curricula, our main takeaway is
            that AI merits more attention within formal education systems. In
            particular, the idea or question of trust and ethics links the role
            of AI among all educational subjects, and AI will continue to impact
            and shape important topics of privacy, race, gender, class,
            education, ideology, among many others. Consequently, we should be
            aware of how vital it is to address AI in the classroom and adopt it
            in a manner that best serves all students, so one day every student
            can feel that AI is for them too.
          </p>

          <p>– Andrew Virtue</p>
        </div>

        <ArticleBottomNav appData={appData} />
      </div>
    </div>
  );
};

export default ArticleClassroom;
