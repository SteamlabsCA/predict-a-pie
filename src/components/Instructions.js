import './Instructions.scss';
import Definition from './Definition';
import React from 'react';
import { strings } from './App';

function Instructions() {

  if (strings.getLanguage() == 'fr') {
    return (
      <div className="Instructions">
        <div className="Instructions-container">
          <h1>Main Heading Français</h1>
          <p>
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
            ut fermentum massa justo sit amet risus. Cras mattis consectetur purus
            sit amet fermentum. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis
            risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
          <h2>Subheading</h2>
          <p>
            Fusce dapibus, <Definition text={strings.neuronDef}>neuron</Definition> ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit
            amet risus. Cras mattis consectetur purus sit amet fermentum. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur ridiculus
            mus. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu
            leo. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Instructions">
        <div className="Instructions-container">
          <h1>Main Heading</h1>
          <p>
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
            ut fermentum massa justo sit amet risus. Cras mattis consectetur purus
            sit amet fermentum. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis
            risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
          <h2>Subheading</h2>
          <p>
            Fusce dapibus, <Definition text={strings.neuronDef}>neuron</Definition> ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit
            amet risus. Cras mattis consectetur purus sit amet fermentum. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur ridiculus
            mus. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu
            leo. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus.
          </p>
        </div>
      </div>
    );
  }
}

export default Instructions;
