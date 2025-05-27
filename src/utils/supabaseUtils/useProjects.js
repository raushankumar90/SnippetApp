import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';

const useProjects = () => {
    const {projects} = useSelector((state) => state.projects);
    const {snippets} = useSelector((state) => state.snippets);
    const getProjectNameById = (project_id) => {
        const project = projects.find((p) => p.project_id === project_id);
        return project ? project.project_name : null;
    };
    return { getProjectNameById };
};

export default useProjects;