
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Content from '../../../../../domain/entities/content';

@Entity('contents')
export class ContentEntity implements Content {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column({ type: 'text' })
  thumbnail: string

  @Column()
  published: boolean

  @Column({ type: 'real' })
  sourceDuration: number

  @Column({ type: 'bigint' })
  sourceSize: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
