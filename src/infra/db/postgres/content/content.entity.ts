import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import Content from '../../../../domain/entities/content'

@Entity()
export default class ContentEntity implements Content {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  thumbnail: string

  @Column()
  published: boolean

  @Column()
  sourceDuration: number

  @Column({ type: 'bigint' })
  sourceSize: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
