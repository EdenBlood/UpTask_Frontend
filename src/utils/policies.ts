import type { Project, TeamMember } from "../types"

const isManager = (managerId: Project['manager'], userId: TeamMember['_id']) => managerId === userId;

export default isManager