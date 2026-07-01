import {
	Users,
	GraduationCap,
	Calendar,
	Compass,
	Film,
	type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'characters' -> t('nav.characters')
	path: string // URL 路径，如 '/characters'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

// Virtua Fighter Crossroads 内容分类（与 content/<locale>/ 目录一一对应）
export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'release', path: '/release', icon: Calendar, isContentType: true },
	{ key: 'characters', path: '/characters', icon: Users, isContentType: true },
	{ key: 'story', path: '/story', icon: Compass, isContentType: true },
	{ key: 'guide', path: '/guide', icon: GraduationCap, isContentType: true },
	{ key: 'trailer', path: '/trailer', icon: Film, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['release', 'characters', 'story', 'guide', 'trailer']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
