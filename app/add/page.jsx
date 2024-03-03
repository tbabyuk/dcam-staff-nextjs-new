import { connectToDB } from '@/db/database'
import { Student } from '@/models/models'


const AddStudentPage = async () => {

    // const studentObject = {
    //     firstName: "John Smith",
    //     duration: 30,
    //     pay: 12.50,
    //     payday: "Friday",
    //     submitted: true
    // }

    // const handleAddStudent = async () => {

    //     try {
    //         await connectToDB()
    //         const student = await Student.create({
    //             firstName: "Sarah Marshall",
    //             duration: 30,
    //             pay: 12.50,
    //             payday: "Friday",
    //             submitted: false,
    //             teacher: "Bonnie"
    //         })
    
    //         } catch (error) {
    //             console.log("Error on AddStudentPage:", error)
    //         }
    
    // }

    const updateTaisiyaAttendance = async () => {

        try {
            await connectToDB()
            const filter = {teacher: "Taisiya"}
            await Student.updateMany(filter, {$set: {payday: "Thursday"}})
            console.log("update successful")
        } catch (error) {
            console.log("error updating doc:", error)
        }

    }

    updateTaisiyaAttendance()




  return (
    <div>
        <p>Add a new student:</p>
    </div>
  )
}


export default AddStudentPage