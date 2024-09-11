import { Component } from "react";

class ErrorBoundary extends Component{
    constructor(props){
        super(props)
        this.state = {hasError:false}
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
          return (
            <div className="w-full h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center">
                <h1 className="text-3xl text-pink-50 animate-bounce hover:animate-spin">Something went wrong</h1>
            </div>
          )
        }
    
        return this.props.children; 
      }
}

export default ErrorBoundary