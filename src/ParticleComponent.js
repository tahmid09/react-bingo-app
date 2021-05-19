import React, { Component } from 'react';
import Particles from "react-particles-js";
import './App.css';
class ParticleComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
       
        };
        
      }
    render() {
        return (
            <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }}
  >
 <Particles
      params={{
        particles: {
          number: {
            value: 250,
            density: {
              enable: true,
              value_area: 1803.4120608655228
            }
          },
          color: {
            value: ["#00FFFC", "#FC00FF", "#fffc00"]
          },
          shape: {
            type: "square",
            // stroke: {
            //   width: 4,
            //   color: "#000000"
            // },
            polygon: {
              nb_sides: 4
            },
           
          },
          opacity: {
            value: 0.4008530152163807,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 6,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 0,
            color: "#ffffff",
            opacity: 0.3687847739990702,
            width: 0.6413648243462091
          },
          move: {
            random: true,
            spee: 5,
            direction: "top",
            out_mode: "out"
        }
        },
        interactivity: {
            detectsOn: "window",
            events: {
              resize: true
            }
          },
        detectRetina: true,
        // background: {
        //     color: "#232323",
        //     opacity: .01
        // },
      
        retina_detect: true
      }}
    />
  </div>
        );
    }
}

export default ParticleComponent;