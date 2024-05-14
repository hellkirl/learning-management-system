import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateEvaluationDto } from './dto/create-evaluations.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiBearerAuth()
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Post(':id/evaluations')
  @ApiOperation({ summary: 'Create a new evaluation' })
  @ApiBearerAuth()
  async createEvaluation(
    @Param('id') id: string,
    @Body() createEvaluationDto: CreateEvaluationDto,
  ) {
    return this.lessonsService.createEvaluation(+id, createEvaluationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all lessons' })
  @ApiBearerAuth()
  async findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a lesson by id' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson by id' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
