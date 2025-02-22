// lib/firestoreOperations.js
import { db } from './firabase';
import { collection, getDocs, addDoc, query, where, deleteDoc } from 'firebase/firestore';


interface Project {
  id: number;
  projectName: string;
  projectDescription: string;
  status: string;
}
const getProjects = async (): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, 'projects');
    const projectSnapshot = await getDocs(projectsRef);
    const projectList = projectSnapshot.docs.map(doc => doc.data() as Project);
    return projectList;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; 
  }
};

const addProject = async (projectData: {id: number, projectName: string, projectDescription: string, status: string }) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      id: projectData.id,
      projectName: projectData.projectName,
      projectDescription: projectData.projectDescription,
      status: projectData.status,
    });
  } catch (error) {
    console.error("Error adding project: ", error);
    throw new Error('Failed to add project');
  }
};


const deleteProjectFromFirestoreById = async (id: number) => {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, where('id', '==', id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    await deleteDoc(docRef);
  } else {
    throw new Error('Project not found');
  }
};


export { getProjects, addProject, deleteProjectFromFirestoreById };
