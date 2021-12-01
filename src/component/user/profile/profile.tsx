import {Component, useEffect, useRef} from "react";
import {connect} from "react-redux";
import './profile.scss'

class Profile extends Component<any, any> {
    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                this.props.user?.imageUrl ? (
                                    <img src={this.props.user?.imageUrl} alt={this.props.user.name}/>
                                ) : (
                                    <Canvas/>
                                )
                            }
                        </div>
                        <div className="profile-name">
                            <h2>{this.props.user?.name}</h2>
                            <p className="profile-email">{this.props.user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

const Canvas = (props: any) => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
        let name = "adhess";
        let nameSplit = name.split(" ");
        let initials = nameSplit[0].charAt(0).toUpperCase()
            + (
                nameSplit.length > 1 ?
                    nameSplit[1].charAt(0).toUpperCase() :
                    nameSplit[0].charAt(1).toUpperCase()
            );

        let charIndex = initials.charCodeAt(0) - 65;
        let colourIndex = charIndex % 19;

        const canvas: any = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = 200;
        canvas.height = 174;

        //Our first draw
        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        console.log(canvas.width)

    let canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        canvasCssWidth = canvasWidth,
        canvasCssHeight = canvasHeight;

    context.fillStyle = colours[colourIndex];
    context.fillRect (0, 0, canvas.width, canvas.height);
    context.font = "128px Arial";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    context.fillText(initials, canvasCssWidth / 1.95, canvasCssHeight / 1.35);
    }, [])

    return <canvas ref={canvasRef} {...props}/>
}


export default connect(mapStateToProps, null)(Profile);