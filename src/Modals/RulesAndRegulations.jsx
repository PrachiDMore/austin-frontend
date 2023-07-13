import React from 'react'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button';

const RulesAndRegulations = ({ checked, setChecked, showModal, setShowModal }) => {
	return (
		<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
			<div className="relative p-4 w-[80vw] h-auto">
				<div className="relative h-full bg-white p-4 rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
					<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
						<h3 className="text-lg font-semibold dark:text-lightPurple">
							{"Rules and Regulations"}
						</h3>
					</div>
					<form onSubmit={(e) => {
						e.preventDefault();
						if (!checked) {
							alert("Please agree the terms and conditions")
						} else {
							setShowModal(false)
						}

					}} className='flex flex-col gap-y-4 h-[75vh] overflow-y-auto'>
						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>1. Application and Enrolment/Admission:</h2>
							<p className='pl-3'>To enroll with Austin Educators, the application form must be completed, signed by the student and Parent/guardian / duly appointed coordinator, and submitted along with a self-attested photocopy of the mark sheet of Class VII / VIII / IX / X / XI / XII and two recent passport size color photographs affixed on the admission form. Incomplete forms shall be rejected, and no claims shall be entertained in that respect. Student and Parent/guardian / duly appointed coordinator shall provide such documents as may be required by Austin Educators from time to time. Many a time, the parents raise a concern that the admission counselors (or somebody at the Branch / Centre) did not inform/guide them about the courses and/or about the terms & conditions properly. It is also the equal responsibility of the parents/guardians to read the terms & conditions thoroughly to enable them to make independent enrolment decisions before making any payment of the fee for admission. Parents/students are free to ask any questions or doubts before admission. We assure you that it will be taken care of with full dedication to enable you to make an informed and good decision. Please be informed that post-admission, this kind of complaint or representation shall not be entertained by the Branch / Centre, nor can it be used as an excuse for a refund or additional discount. Enrolment is subject to availability, and Austin Educators reserves the right to accept or reject any enrolment application.</p>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>2. Payment of Fees:</h2>
							<ol className='flex flex-col gap-y-2 pl-3'>
								<li>a.	The fees can be paid either in lump sum or in instalments. Provided however, that in case of payment through E.M.I, the 1st instalment should be paid before the commencement of class and the remaining instalments, if any are to be paid by A/C payee Post Dated Local Cheques at the time of admission itself or any other payment method as may be accepted by the Company. An additional concession of 8% on Tuition & Classroom Service Fee Component of Long-Term Courses (i.e., Two / Three / Four Year Integrated Classroom Courses shall be granted for payment of lump sum fee of one year. However, on Lumpsum payment for Full Course upfront for Three / Four Year Courses, 10% concession will be given. However, no lump sum concession benefit is available on Registration Fee, Admission Kit & Digital Access Fee, Technology Fee & Examination Fee.</li>
								<li className='flex flex-col'>
									b.	All payment of fee for Long Term as well as Short Term Courses, including ancillary charges should be paid through any of the below listed payment modes only: <br />
									<ul className=' flex flex-col'>
										<li className='pl-4'>I.	Cheque</li>
										<li className='pl-4'>II. Demand Draft (Hereinafter 'DD') </li>
										<span className='pl-6 text-sm'><b>Note</b>: Please note that since Austin Educators is the primary obligor all Cheque(s) /DD(s) should be drawn in favour of 'Austin Educators' for Foundation Courses, Medical Courses and Engineering Courses.</span>
										<li className='pl-4'>III. Net banking (RTGS / NEFT), Auto debit through ECS </li>
										<li className='pl-4'>IV. Mobile Wallets: For more information on payment through mobile wallets like GPay, Paytm, Mobikwik, PayU, etc. kindly contact the Branch / Centre opted by or allotted to your ward.</li>
										<li className='pl-4'>V.	Debit / Credit Card</li>
										<li className='pl-4'>VI. Online payment through Payment Gateway</li>
									</ul>
								</li>
								<li>c. Austin Educators offers coaching classes for various courses including 6th to 12th Kar State/CBSE/ICSE/IGCSE Board, IIT foundation courses for grades 6th to 10th, NEET-UG, K-CET, IIT-JEE, IMU-CET & Olympiads.</li>
								<li>d. The course offerings may vary, and Austin Educators reserves the right to modify or discontinue any course without prior notice.</li>
							</ol>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>3. Individual Coaching: </h2>
							<ul className='pl-3'>
								<p>a.	Students opting for one-on-one coaching will be eligible for a free session of a demo class to experience the teaching method and assess internet compatibility.</p>
								<p>b.	If the student decides to continue with the one-on-one coaching post demo class, an advance payment equivalent to 80 hours of coaching must be made. </p>
								<p>c.	When there are 10 hours left in the current 80-hour package, the student must recharge for the next 80-hour package to continue the coaching. </p>
								<p>d.	If the student experiences difficulties with any teacher during the one-on-one coaching sessions, they should coordinate with the student coordinator for schedule changes or teacher replacements or write mail to <a className='text-blue-600 underline underline-offset-2' href="mailto:support@austineducators.com">support@austineducators.com</a></p>
								<p>e.	Students who are enrolled for two/three/four/five student batch on being absent on any day of the scheduled class, the class will be conducted if the attendees comprise 50% and more from the respective batch and the payment for the hours taken are considered for all students in the given batch.</p>
								<p>f.	No refund will be processed in any case for the one-on-one coaching if the student quits with no prior formal notice or request.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>4. Group Classes (Long Term): </h2>
							<ul className='pl-3'>
								<p>a.	For group classes, a payment of 10,000 (Indian Rupees) must be made before the commencement of the class to secure the seat. </p>
								<p>b.	The remaining due amount can be paid in instalments over a period of Three months from the time of admission.</p>
								<p>c.	Failure to make instalment payments may result in suspension or termination of the student's enrolment.</p>
								<p>d.	Students who involve themselves in unethical behaviour, irregularity to classes without prior notice or genuine reasons may subject to cancellation of admission in any given time since then.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>5. Cancellation and Refunds: </h2>
							<ul className='pl-3'>
								<p>a.	If a student wishes to cancel their enrolment, they must provide written notice to Austin Educators. </p>
								<p>b.	Refunds, if applicable, will be processed as per the refund policy mentioned below.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>6. Refund Policy: </h2>
							<ul className='pl-3'>
								<p>a.	Refunds for one-on-one coaching are not applicable under any circumstances. </p>
								<p>b.	In the case of group classes, if a student cancels their enrolment before the commencement of classes, a refund may be issued minus any administrative fees. </p>
								<p>c.	No refund will be processed once the classes have commenced.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>7. Code of Conduct: </h2>
							<ul className='pl-3'>
								<p>a.	Students enrolled in Austin Educators are expected to adhere to a code of conduct, which includes respectful behaviour towards educators and fellow students. </p>
								<p>b.	Students are expected to be sincere and honest and develop dedication in completing any assigned work given.</p>
								<p>c.	Any violation of the code of conduct may result in disciplinary action, including possible termination of enrolment.</p>
								<p>d.	Students are expected to be on time to the class 15 minutes before the commencement of classes in order to prepare themselves mentally.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>8. Intellectual Property: </h2>
							<ul className='pl-3'>
								<p>a.	All course materials, content, and intellectual property provided by Austin Educators are protected by copyright and other intellectual property laws.</p>
								<p>b.	Students may not reproduce, distribute, or modify any course materials without prior written consent from Austin Educators.</p>
								<p>c.	Any damages done to the infrastructure by any student shall be liable to incur the costs of the damages.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>9. Limitation of Liability: </h2>
							<ul className='pl-3'>
								Austin Educators shall not be held liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the coaching classes or the use of the course materials.
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>10. Governing Law and Jurisdiction: </h2>
							<ul className='pl-3'>
								<p>a.	These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction where Austin Educators operates. </p>
								<p>b.	Any disputes arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>11. Austin-I-Tutor Online Platform:  </h2>
							<ul className='pl-3'>
								<p>a.	Austin-I-Tutor, an online platform provided by Austin Educators offers coaching classes to students from any part of the world. </p>
								<p>b.	The same rules and terms mentioned in these Terms and Conditions will be applied to Austin-I-Tutor as well.</p>
								<p>c.	Students must have WiFi Connectivity enabled.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>12.	Austin Abroad Immigration Consultancy: </h2>
							<ul className='pl-3'>
								<p>a.	Austin Abroad, an immigration consultancy firm is a part of Austin Educators. </p>
								<p>b.	For students and individuals interested in migrating to the US, Canada, UK, Germany, Australia, Ireland, and for coaching classes related to IELTS, TOEFL, PTE, CELPIP, and PREPARATION FOR PROFESSIONALS, different terms and conditions mentioned in the retainer agreement specific to Austin Abroad will apply.</p>
							</ul>
						</div>

						<div className='flex flex-col gap-y-2'>
							<h2 className='text-xl font-bold'>13.	Publicity: </h2>
							<ul className='pl-3'>
								The Organisation reserves the right to use the single / group photograph(s) and name of the student for publicity in all kinds of media, if the student secures position / rank or succeeds in any Foundations / Medical / Engineering Entrance Exams in India or any test at international level at any time. In addition to the photograph, the Company also reserves the right to record video-audio testimonial of the student & parent for the purpose of referencing or promotion, as required by the Company at any stage during and/or after the completion of the course for the purpose of publicity in all kinds of media. No separate permission will be taken from parents / students for the same</ul>
						</div>
						<div className='flex justify-center'>
							<Checkbox required={true} reverse={true} id={"rules-and-regulations-main"} onChange={(e) => { setChecked(e.target.checked) }} label={"I agree to the terms and conditions"} />
						</div>
						<Button text='Submit' type='submit' />
					</form>
				</div>
			</div>
		</div>
	)
}

export default RulesAndRegulations
