import React, { useEffect, useState } from 'react'
import { UseTeacherContext } from '../context/Teachers'
import { UseSubjectContext } from '../context/Subjects'
import { UseChapterContext } from '../context/Chapter'
import { UseCourseContext } from '../context/Courses'
import { UseChapterAllocationContext } from '../context/ChapterAllocation'
import Input from '../components/Input'
import axios from 'axios'
import SearchableSelect from '../components/SearchableSelect'
import { UseBatchesContext } from '../context/Batches'
import Button from '../components/Button'
import AssignTeacherInitialState from '../InitialStates/AssignTeacher'
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray'
import addElementInArray from '../Utils/AddUniqueElementsInArray'
import extractToken from "../Utils/ExtractToken";

const AssignTeacher = ({ setShowModal, showModal, setMessage }) => {
	const { teacherOptions } = UseTeacherContext()
	const { subjectOptions } = UseSubjectContext()
	const { chapterOptions } = UseChapterContext()
	const { courseOptions } = UseCourseContext();
	const { batchOptions } = UseBatchesContext();
	const { chapterAllocations, setChapterAllocations } = UseChapterAllocationContext()
	const [displayChapters, setDisplayChapters] = useState([]);
	const [displaySubjects, setDisplaySubjects] = useState([])
	const [chapter, setChapter] = useState()
	const [teacher, setTeacher] = useState();
	const [subject, setSubject] = useState();
	const [course, setCourse] = useState()
	const [batch, setBatch] = useState()
	const [formState, setFormState] = useState(AssignTeacherInitialState);
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (showModal.update) {
			setFormState(showModal.data)
			setCourse(courseOptions?.filter((course) => {
				return course?._id === showModal?.data?.batch?.course
			})[0])
			setSubject(subjectOptions?.filter((subject) => {
				return subject?._id === showModal?.data?.subject?._id
			})[0])
			setBatch(batchOptions?.filter((batch) => {
				return batch?._id === showModal?.data?.batch?._id
			})[0])
			setChapter(chapterOptions?.filter((chapter) => {
				return chapter?._id === showModal?.data?.chapter?._id
			})[0])
			setTeacher(teacherOptions?.filter((teacher) => {
				return teacher?._id === showModal?.data?.teacher?._id
			})[0])
		} else {
			setFormState(AssignTeacherInitialState)
		}
	}, [showModal]);

	const handleSubmit = (e) => {
		e.preventDefault()
		if (showModal.update) {
			setLoading(true)
			axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/${showModal?.data?._id}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				},
				data: {
					...formState,
					subject: subject.value,
					batch: batch.value,
					chapter: chapter.value,
					teacher: teacher.value
				}
			})
				.then((res) => {
					if (res.data.error) {
						setMessage(res.data.message)
						setLoading(false)
						setShowModal({ show: false, update: false, data: undefined })
					} else {
						setMessage(res.data.message)
						setLoading(false)
						setChapterAllocations(updateElementsInArray(chapterAllocations, res.data.chapterAllocation, showModal.data));
						setShowModal({ show: false, update: false, data: undefined })
					}
				})
		} else {
			setLoading(true)
			axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/create`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				},
				data: {
					...formState,
					subject: subject.value,
					batch: batch.value,
					chapter: chapter.value,
					teacher: teacher.value
				}
			})
				.then((res) => {
					if (res.data.error) {
						setLoading(false)
						setMessage(res.data.message)
						setShowModal({ show: false, update: false, data: undefined })
					} else {
						setMessage(res.data.message)
						setLoading(false)
						setChapterAllocations(addElementInArray(chapterAllocations, res.data.chapterAllocation));
						setShowModal({ show: false, update: false, data: undefined })
					}
				})
		}
	}

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	const handleSubject = (subject) => {
		setSubject(subject);
	}
	const handleTeacher = (teacher) => {
		setTeacher(teacher);
	}
	const handleChapter = (chapter) => {
		setChapter(chapter);
	}
	const handleCourse = (course) => {
		setCourse(course);
	}
	const handleBatch = (batch) => {
		setBatch(batch);
	}

	useEffect(() => {
		if (subjectOptions && chapterOptions) {
			if (subject) {
				setDisplayChapters(chapterOptions.filter((chapter) => {
					return chapter.subjectID._id === subject?.value
				}))
			} else {
				setDisplayChapters(chapterOptions)
			}
		}
	}, [subjectOptions, subject, chapterOptions]);

	useEffect(() => {
		if (course) {
			const courseSubjects = course?.subjects?.map((subject) => {
				return subject._id;
			})
			setDisplaySubjects(subjectOptions?.filter((subject) => {
				return courseSubjects.includes(subject._id)
			}))
		}
	}, [subjectOptions, chapterOptions, course]);

	return (
		<>
			<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
				<div className="relative p-4 w-[75vw] h-[73vh] ">
					<div className="relative h-full bg-white p-4 rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
						<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
							<h3 className="text-lg font-semibold dark:text-lightPurple">
								{showModal.update ? "Update Teacher" : "Assign Teacher"}
							</h3>
							<button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
								onClick={() => {
									setShowModal({ show: false, update: false, data: undefined })
								}}
							>
								<svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						<form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-6 gap-y-5 '>
							<SearchableSelect value={course} options={courseOptions} isMulti={false} onChange={handleCourse} label={"Courses"} />
							<SearchableSelect value={subject} options={displaySubjects} isMulti={false} onChange={handleSubject} label={"Subjects"} />
							<SearchableSelect value={chapter} options={displayChapters} isMulti={false} onChange={handleChapter} label={"Chapters"} />
							<SearchableSelect value={batch} options={batchOptions} isMulti={false} onChange={handleBatch} label={"Batch"} />
							<SearchableSelect value={teacher} options={teacherOptions} isMulti={false} onChange={handleTeacher} label={"Teacher"} />
							<Input onChange={handleChange} value={formState.hours} label={"Hours"} id={"hours"} type={"number"} />
							<Input onChange={handleChange} value={formState.rate} label={"Rate per hour"} id={"rate"} type={"number"} />
							<Input onChange={handleChange} value={formState.hoursCompleted} label={"Hours completed"} id={"hoursCompleted"} type={"number"} />
							<div className={"col-span-2 flex justify-center"}>
								<Button loading={loading} text='Submit' type='submit' className={"w-52"} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default AssignTeacher