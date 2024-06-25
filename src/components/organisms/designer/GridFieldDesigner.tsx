import React from 'react';


const GridFieldDesigner: React.FC = () => {


    return (
        <div>
            <div className="border border-dashed border-gray-400 p-2 flex-1">
                <canvas id="canvas1" className="bg-white w-full " height="10"></canvas>
            </div>
        </div>
    );
};

export default GridFieldDesigner;
