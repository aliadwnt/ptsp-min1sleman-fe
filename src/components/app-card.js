import React from 'react';

const Card = ({ title, description, actions, content }) => {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="p-4 overflow-hidden bg-white shadow sm:rounded-lg sm:p-6 lg:p-8">
                <div className="flex flex-col justify-between sm:flex-row">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                        {description && (
                            <p className="mt-1 text-sm text-gray-600 sm:max-w-lg">
                                {description}
                            </p>
                        )}
                    </div>
                    <div>
                        {actions && (
                            <div className="flex items-center justify-end pb-4 space-x-4 text-right">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
                {content && (
                    <div className="mt-2 text-sm text-gray-600">
                        {content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
