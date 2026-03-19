export const Header = ({ content, size }) => {
    if (size === "h1") {
        return (
            <h1>{content}</h1>
        )
    }
    else {
        return (
            <h2>{content}</h2>
        )
    }
}


const Part = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.exercise}
            </p>
        </div>
    )
}

const Content = ({ course }) => {
    return (
        <>
            {course.parts.map(part => (
                <Part name={part.name} exercise={part.exercises} key={part.name} />
            ))}

            <Total course={course} />

        </>
    )
}


const Total = ({ course }) => {

    const total = course.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <>
            <p>
                <b>Total of {total} exercises</b>
            </p>
        </>
    )
}

export const Course = ({ course }) => {
    return (
        <>
            <Header content={course.name} />
            <Content course={course} />
        </>
    )
}
